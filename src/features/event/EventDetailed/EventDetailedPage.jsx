import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { withFirestore, firebaseConnect, isEmpty } from 'react-redux-firebase';
import { compose } from 'redux';
import EventDetailedHeader from "./EventDetailedHeader";
import EventDetailedInfo from "./EventDetailedInfo";
import EventDetailedChat from "./EventDetailedChat";
import EventDetailedSidebar from "./EventDetailedSidebar";
import {objectToArray, createDataTree} from "../../../app/common/util/helpers";
import {goingToEvent, cancelGoingToEvent} from "../../user/UserActions";
import {addEventComment} from "../EventActions";

// test: state.firebase.data.event_chat[ownProps.match.params.id]

/**
 *
 * @param state
 * @param ownProps
 * @returns {{event, auth: *, eventChat: (boolean|any[])}}
 */
const mapState = (state, ownProps) => {

    /**
     *
     * @type {{}}
     */
    let event = {};

    if (state.firestore.ordered.events && state.firestore.ordered.events[0]) {
        event = state.firestore.ordered.events[0];
    }

    return {
        event,
        auth: state.firebase.auth,
        eventChat:
        !isEmpty(state.firebase.data.event_chat) &&
        objectToArray(state.firebase.data.event_chat[ownProps.match.params.id])
    };
};

/**
 *
 * @type {{goingToEvent: goingToEvent, cancelGoingToEvent: cancelGoingToEvent, addEventComment: addEventComment}}
 */
const actions = {
    goingToEvent,
    cancelGoingToEvent,
    addEventComment
}

class EventDetailedPage extends Component {

    /**
     *
     * @returns {Promise<void>}
     */
    async componentDidMount() {
        const {firestore, match} = this.props;
        await firestore.setListener(`events/${match.params.id}`);
    }

    /**
     *
     * @returns {Promise<void>}
     */
    async componentWillUnmount() {
        const {firestore, match} = this.props;
        await firestore.unsetListener(`events/${match.params.id}`);
    }


    render() {
        const {
            event,
            auth,
            goingToEvent,
            cancelGoingToEvent,
            addEventComment,
            eventChat
        } = this.props;
        /**
         *
         * @type {*|{}|attendees|*[]|any[]}
         */
        const attendees = event && event.attendees && objectToArray(event.attendees);
        /**
         *
         * @type {boolean}
         */
        const isHost = event.hostUid === auth.uid;
        /**
         *
         * @type {*|{}|attendees|*[]|any[]|boolean}
         */
        const isGoing = attendees && attendees.some(a => a.id === auth.uid);
        /**
         *
         * @type {boolean|Array}
         */
        const chatTree = !isEmpty(eventChat) && createDataTree(eventChat);

        return (
            <Grid>
                <Grid.Column width={10}>
                    <EventDetailedHeader
                        event={event}
                        isHost={isHost}
                        isGoing={isGoing}
                        goingToEvent={goingToEvent}
                        cancelGoingToEvent={cancelGoingToEvent}
                    />
                    <EventDetailedInfo event={event}/>
                    <EventDetailedChat
                        eventChat={chatTree}
                        addEventComment={addEventComment}
                        eventId={event.id}
                    />
                </Grid.Column>
                <Grid.Column width={6}>
                    <EventDetailedSidebar attendees={attendees}/>
                </Grid.Column>
            </Grid>
        )
    }

}

export default compose(
    withFirestore,
    connect(mapState, actions),
    firebaseConnect(props => [`event_chat/${props.match.params.id}`])
)(EventDetailedPage);
