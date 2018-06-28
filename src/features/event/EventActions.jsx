// Actions Creators
import React from 'react'
import {toastr} from 'react-redux-toastr'
import {DELETE_EVENT, FETCH_EVENTS} from "./EventConstant";
import {asyncActionStart, asyncActionFinish, asyncActionError} from "../async/asyncActions";
import {fetchSampleData} from "../../app/data/mockApi";
import {createNewEvent} from "../../app/common/util/helpers";
import {Emoji} from "emoji-mart";
import moment from "moment";

export const fecthEvents = (events) => {
    return {
        type: FETCH_EVENTS,
        payload: events
    }
};

export const createEvent = (event) => {
    return async (dispatch, getState, {getFirestore}) => {
        const firestore = getFirestore();
        const user = firestore.auth().currentUser;
        const photoURL = getState().firebase.profile.photoURL;
        let newEvent = createNewEvent(user, photoURL, event);
        try {
            let createdEvent = await firestore.add(`events`, newEvent);
            await firestore.set(`event_attendee/${createdEvent.id}_${user.uid}`, {
                eventId: createdEvent.id,
                userUid: user.uid,
                eventDate: event.date,
                host: true
            });
            toastr.success(
                "Yes!",
                "Votre Events à été créé",
                {icon: (<Emoji emoji='muscle' size={45} native/>)}
            );
        } catch (e) {
            toastr.error(
                "Ola!",
                "Quelque chose s'est mal passé…",
                {icon: (<Emoji emoji='cold_sweat' size={45} native/>)}
            );
        }
    }
};

export const updateEvent = (event) => {
    return async (dispatch, getState, {getFirestore}) => {
        const firestore = getFirestore();
        if(event.date !== getState().firestore.ordered.events[0].date){
            event.date = moment(event.date).toDate();
        }
        try {
            await firestore.update(`events/${event.id}`, event);
            toastr.success("Yes!", "Votre Events à été mis à jour", {
                icon: (<Emoji emoji='thumbsup' size={45} native/>)
            });
        } catch (e) {
            console.log(e);
            toastr.error("Mamamia!", "Il semble y avoir un problème", {
                icon: (<Emoji emoji='cold_sweat' size={45} native/>)
            });
        }
    }

};

export const cancelToggle = (cancelled, eventId) =>
    async (dispatch, getState, {getFirestore}) => {
        const firestore = getFirestore();
        const message = cancelled ? 'Êtes-vous sur ?' : "Cela réactivera l'Events, êtes-vous sur ?";
        try {
            toastr.confirm(message, {
                onOk: () => firestore.update(`events/${eventId}`, {
                    cancelled: cancelled
                })
            })
        } catch (e) {
            console.log(e);
        }
    }

export const deleteEvent = (eventId) => {
    return {
        type: DELETE_EVENT,
        payload: {
            eventId
        }
    }
};

export const loadEvents = () => {
    return async dispatch => {
        try {
            dispatch(asyncActionStart());
            let events = await fetchSampleData();
            dispatch(fecthEvents(events));
            dispatch(asyncActionFinish());
        } catch (error) {
            console.log(error);
            dispatch(asyncActionError())
        }
    }
};