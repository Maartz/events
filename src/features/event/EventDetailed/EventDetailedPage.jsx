import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { withFirestore, firebaseConnect, isEmpty } from 'react-redux-firebase';
import { compose } from 'redux';
import { toastr } from 'react-redux-toastr';
import EventDetailedHeader from "./EventDetailedHeader";
import EventDetailedInfo from "./EventDetailedInfo";
import EventDetailedChat from "./EventDetailedChat";
import EventDetailedSidebar from "./EventDetailedSidebar";
import {objectToArray, createDataTree} from "../../../app/common/util/helpers";
import {goingToEvent, cancelGoingToEvent} from "../../user/UserActions";
import {addEventComment} from "../EventActions";
import {openModal} from "../../modals/ModalActions";
import {Emoji} from "emoji-mart";
import LoadingComponent from "../../../app/layout/LoadingComponent";

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
        requesting: state.firestore.status.requesting,
        event,
        loading: state.async.loading,
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
    addEventComment,
    openModal
}

class EventDetailedPage extends Component {

    state = {
        initialLoading: true
    }

    /**
     *
     * @returns {Promise<void>}
     */
    async componentDidMount() {


        const {firestore, match} = this.props;
        let event = await firestore.get(`events/${match.params.id}`);
        if(!event.exists) {
            toastr.error("Ola!", "Cet Events n'existe pas ou plus.", {
                icon: (<Emoji emoji='sweat_smile' size={45} native/>)
            });
            this.props.history.push('/events');
        }

        await firestore.setListener(`events/${match.params.id}`);
        this.setState({
            initialLoading: false
        })
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
            requesting,
            openModal,
            event,
            match,
            auth,
            goingToEvent,
            cancelGoingToEvent,
            addEventComment,
            eventChat,
            loading
        } = this.props;

        /**
         *
         * @type {*|{}|*[]|attendees|any[]}
         */
        const attendees = event && event.attendees && objectToArray(event.attendees).sort(function (a, b) {
            return a.joinDate - b.joinDate;
        });
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

        /**
         *
         * @type {*|boolean}
         */
        const authenticated = auth.isLoaded && !auth.isEmpty;

        const loadingEvent = requesting[`events/${match.params.id}`];

        if(loadingEvent || this.state.initialLoading) return <LoadingComponent inverted={true}/>;

        return (
            <Grid>
                <Grid.Column width={10}>
                    <EventDetailedHeader
                        event={event}
                        loading={loading}
                        isHost={isHost}
                        isGoing={isGoing}
                        goingToEvent={goingToEvent}
                        cancelGoingToEvent={cancelGoingToEvent}
                        authenticated={authenticated}
                        openModal={openModal}
                    />
                    <EventDetailedInfo event={event}/>
                    {authenticated &&
                    <EventDetailedChat
                        eventChat={chatTree}
                        addEventComment={addEventComment}
                        eventId={event.id}
                    />}
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
