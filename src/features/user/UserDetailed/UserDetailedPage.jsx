import React, {Component} from 'react';
import {firestoreConnect, isEmpty} from 'react-redux-firebase';
import {compose} from 'redux';
import {connect} from 'react-redux'
import {Grid} from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import UserDetailedHeader from "./UserDetailedHeader";
import UserDetailedDescription from "./UserDetailedDescription";
import UserDetailedSidebar from "./UserDetailedSidebar";
import UserDetailedPhoto from "./UserDetailedPhoto";
import UserDetailedEvents from "./UserDetailedEvents";
import {userDetailledQuery} from "../UserQueries";
import {followUser, getUserEvents, unFollowUser} from "../UserActions";
import {toastr} from "react-redux-toastr";
import {Emoji} from "emoji-mart";


/**
 *
 * @param state
 * @param ownProps
 * @returns {{profile: *, userUid: *, events: *, eventsLoading: *, auth: *, photos: *, requesting: *, following: *}}
 */
const mapState = (state, ownProps) => {
    let userUid = null;
    let profile = {};

    if (ownProps.match.params.id === state.auth.uid) {
        profile = state.firebase.profile;
    } else {
        profile = !isEmpty(state.firestore.ordered.profile) && state.firestore.ordered.profile[0];
        userUid = ownProps.match.params.id;
    }

    return {
        profile,
        userUid,
        events: state.events,
        eventsLoading: state.async.loading,
        auth: state.firebase.auth,
        photos: state.firestore.ordered.photos,
        requesting: state.firestore.status.requesting,
        following: state.firestore.ordered.following
    }
};

/**
 *
 * @type {{getUserEvents: getUserEvents, followUser: followUser}}
 */
const actions = {
    getUserEvents,
    followUser,
    unFollowUser,
};


class UserDetailedPage extends Component {

    /**
     *
     * @returns {Promise<void>}
     */
    async componentDidMount() {
        let user = await this.props.firestore.get(`users/${this.props.match.params.id}`);
        if (!user.exists){
            toastr.error("Ola!", "Cet Eventeurs n'existe pas ou plus.", {
                icon: (<Emoji emoji='sweat_smile' size={45} native/>)
            });
            this.props.history.push('/events');
        }
        // let events = await this.props.getUserEvents(this.props.userUid);
        // console.log(events);
    }

    /**
     *
     * @param evt
     * @param data
     */
    changeTab = (evt, data) => {
        //console.log(data);
        this.props.getUserEvents(this.props.userUid, data.activeIndex);
    };

    /**
     *
     * @returns {*}
     */
    render() {
        const {
            profile,
            auth,
            photos,
            match,
            requesting,
            events,
            eventsLoading,
            followUser,
            following,
            unFollowUser
        } = this.props;
        const isCurrentUser = auth.uid === match.params.id;
        const loading = requesting[`users/${match.params.id}`];
        const isFollowing = !isEmpty(following);

        if (loading) return <LoadingComponent inverted={true}/>;

        return (
            <Grid>
                <UserDetailedHeader profile={profile}/>
                <UserDetailedDescription profile={profile}/>
                <UserDetailedSidebar
                    isFollowing={isFollowing}
                    unFollowUser={unFollowUser}
                    profile={profile}
                    followUser={followUser}
                    isCurrentUser={isCurrentUser}
                />
                {photos && photos.length > 0 &&
                <UserDetailedPhoto photos={photos}/>}
                <UserDetailedEvents changeTab={this.changeTab} events={events} eventsLoading={eventsLoading}/>
            </Grid>
        );
    }
}

export default compose(
    connect(mapState, actions),
    firestoreConnect((auth, userUid, match) => userDetailledQuery(auth, userUid, match))
)(UserDetailedPage);