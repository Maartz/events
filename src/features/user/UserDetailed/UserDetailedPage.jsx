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



const mapState = (state, ownProps) => {
    let userUid = null;
    let profile = {}

    if(ownProps.match.params.id === state.auth.uid){
        profile = state.firebase.profile;
    } else {
        profile = !isEmpty(state.firestore.ordered.profile) && state.firestore.ordered.profile[0];
        userUid = ownProps.match.params.id;
    }

    return {
        profile,
        userUid,
        auth: state.firebase.auth,
        photos: state.firestore.ordered.photos
    }
};

class UserDetailedPage extends Component {
    render() {
        const {profile, auth, photos, match} = this.props;
        const isCurrentUser = auth.uid === match.params.id;
        return (
            <Grid>
                <UserDetailedHeader profile={profile} />
                <UserDetailedDescription profile={profile} />
                <UserDetailedSidebar isCurrentUser={isCurrentUser}/>
                {photos && photos.length > 0 &&
                <UserDetailedPhoto photos={photos}/>}
                <UserDetailedEvents/>
            </Grid>

        );
    }
}

export default compose(
    connect(mapState),
    firestoreConnect((auth, userUid) => userDetailledQuery(auth, userUid))
)(UserDetailedPage);