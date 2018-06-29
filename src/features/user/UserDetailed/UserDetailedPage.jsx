import React, {Component} from 'react';
import { firestoreConnect, isEmpty } from 'react-redux-firebase';
import { compose } from 'redux';
import { connect } from 'react-redux'
import {Grid} from "semantic-ui-react";

import LoadingComponent from "../../../app/layout/LoadingComponent";
import UserDetailedHeader from "./UserDetailedHeader";
import UserDetailedDescription from "./UserDetailedDescription";
import UserDetailedSidebar from "./UserDetailedSidebar";
import UserDetailedPhoto from "./UserDetailedPhoto";
import UserDetailedEvents from "./UserDetailedEvents";
import {userDetailledQuery} from "../UserQueries";
import {getUserEvents} from "../UserActions";



const mapState = (state, ownProps) => {
    let userUid = null;
    let profile = {};

    if(ownProps.match.params.id === state.auth.uid){
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
        requesting: state.firestore.status.requesting
    }
};

const actions = {
    getUserEvents
};

class UserDetailedPage extends Component {

    async componentDidMount() {
        let events = await this.props.getUserEvents(this.props.userUid);
        console.log(events);
    }

    changeTab = (evt, data) => {
        //console.log(data);
        this.props.getUserEvents(this.props.userUid, data.activeIndex);
    };

    render() {
        const {profile, auth, photos, match, requesting, events, eventsLoading} = this.props;
        const isCurrentUser = auth.uid === match.params.id;
        const loading = Object.values(requesting).some(a => a === true);

        if(loading) return <LoadingComponent inverted={true}/>;

        return (
            <Grid>
                <UserDetailedHeader profile={profile} />
                <UserDetailedDescription profile={profile} />
                <UserDetailedSidebar isCurrentUser={isCurrentUser}/>
                {photos && photos.length > 0 &&
                <UserDetailedPhoto photos={photos}/>}
                <UserDetailedEvents changeTab={this.changeTab} events={events} eventsLoading={eventsLoading}/>
            </Grid>
        );
    }
}

export default compose(
    connect(mapState, actions),
    firestoreConnect((auth, userUid) => userDetailledQuery(auth, userUid))
)(UserDetailedPage);