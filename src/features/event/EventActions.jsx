// Actions Creators
import React from 'react'
import {toastr} from 'react-redux-toastr'
import {FETCH_EVENTS} from "./EventConstant";
import {asyncActionStart, asyncActionFinish, asyncActionError} from "../async/asyncActions";
import {createNewEvent} from "../../app/common/util/helpers";
import {Emoji} from "emoji-mart";
import moment from "moment";
import firebase from '../../app/config/firebase';
import compareAsc from 'date-fns/compare_asc';

/**
 *
 * @param event
 * @returns {Function}
 */
export const createEvent = (event) => {
    return async (dispatch, getState, {getFirestore}) => {
        const firestore = getFirestore();
        /**
         *
         * @type {firebase.User|{}|initialState.currentUser|currentUser|*}
         */
        const user = firestore.auth().currentUser;

        const photoURL = getState().firebase.profile.photoURL;
        /**
         *
         * @type {{hostUid: *, hostedBy: *, hostPhotoURL: (*|string), created: number, attendees: {}}}
         */
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

/**
 *
 * @param event
 * @returns {Function}
 */
export const updateEvent = (event) => {
    return async (dispatch, getState) => {
        dispatch(asyncActionStart())
        const firestore = firebase.firestore();
        if(event.date !== getState().firestore.ordered.events[0].date){
            event.date = moment(event.date).toDate();
        }
        try {
            let eventDocRef = firestore.collection('events').doc(event.id);
            let dateEqual = compareAsc(getState().firestore.ordered.events[0].date.toDate(), event.date);

            if (dateEqual === 0) {
                let batch = firestore.batch();
                await batch.update(eventDocRef, event);

                let eventAttendeeRef = firestore.collection('event_attendee');
                let eventAttendeeQuery = await eventAttendeeRef.where('eventId', '==', event.id);
                let eventAttendeeQuerySnap = await eventAttendeeQuery.get();

                for (let i = 0; i < eventAttendeeQuerySnap.docs.length; i++) {
                    let eventAttendeeDocRef = await firestore
                        .collection('event_attendee')
                        .doc(eventAttendeeQuerySnap.docs[i].id);

                    await batch.update(eventAttendeeDocRef, {
                        eventDate: event.date
                    })
                }
                await batch.commit();
            } else {
                await eventDocRef.update(event);
            }
            dispatch(asyncActionFinish());
            toastr.success("Yes!", "Votre Events à été mis à jour", {
                icon: (<Emoji emoji='thumbsup' size={45} native/>)
            });
        } catch (e) {
            console.log(e);
            dispatch(asyncActionError());
            toastr.error("Mamamia!", "Il semble y avoir un problème", {
                icon: (<Emoji emoji='cold_sweat' size={45} native/>)
            });
        }
    }

};

/**
 *
 * @param cancelled
 * @param eventId
 * @returns {Function}
 */
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
    };

/**
 *
 * @param lastEvent
 * @returns {Function}
 */
export const getEventsForDashboard = (lastEvent) =>
    async (dispatch, getState) => {
        /**
         *
         * @type {Date}
         */
        let today = new Date(Date.now());
        /**
         *
         * @type {firebase.firestore.Firestore | *}
         */
        const firestore = firebase.firestore();
        /**
         *
         * @type {firebase.firestore.CollectionReference}
         */
        const eventsRef = firestore.collection('events');

        // TODO : Add localisation from browser

        try {
            dispatch(asyncActionStart());
            let startAfter = lastEvent &&
                await firestore.collection('events').doc(lastEvent.id).get();
            let query;

            lastEvent
                ? query = eventsRef
                    .where('date', '>=', today)
                    .orderBy('date')
                    .startAfter(startAfter)
                    .limit(4)
                : query = eventsRef
                    .where('date', '>=', today)
                    .orderBy('date')
                    .limit(4);

            /**
             *
             * @type {firebase.firestore.QuerySnapshot}
             */
            let querySnap = await query.get();

            if (querySnap.docs.length === 0) {
                dispatch(asyncActionFinish());
                return;
            }

            /**
             *
             * @type {Array}
             */
            let events = [];
            // console.log(querySnap);

            for (let i = 0; i < querySnap.docs.length; i++) {
                let evt = {...querySnap.docs[i].data(), id: querySnap.docs[i].id};
                events.push(evt);
            }
            dispatch({type: FETCH_EVENTS, payload: {events}});
            dispatch(asyncActionFinish());
            return querySnap;
        } catch (e) {
            // console.log(e);
            dispatch(asyncActionError());
        }
    };

/**
 *
 * @param eventId
 * @param values
 * @param parentId
 * @returns {Function}
 */
export const addEventComment = (eventId, values, parentId) =>
    async (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();
        const profile = getState().firebase.profile;
        /**
         *
         * @type {firebase.User | null}
         */
        const user = firebase.auth().currentUser;
        let newComment = {
            parentId,
            displayName: profile.displayName,
            photoURL: profile.photoURL || '/assets/user.png',
            uid: user.uid,
            text: values.comment,
            date: Date.now()
        };
        try {
            await firebase.push(`event_chat/${eventId}`, newComment)
        } catch (error) {
            // console.log(error);
            toastr.error("Oups!", "Il semble y avoir un problème", {
                icon: (<Emoji emoji='cold_sweat' size={45} native/>)
            });
        }
    };