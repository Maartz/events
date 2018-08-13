import React from 'react'
import moment from 'moment';
import {toastr} from 'react-redux-toastr';
import cuid from 'cuid';
import {asyncActionStart, asyncActionError, asyncActionFinish} from "../async/asyncActions";
import firebase from '../../app/config/firebase';
import {Emoji} from "emoji-mart";
import {FETCH_EVENTS} from "../event/EventConstant";


/**
 *
 * @param user
 * @returns {Function}
 */
export const updateProfile = (user) => async (dispatch, getState, {getFirebase}) => {
    const firebase = getFirebase();
    const {isLoaded, isEmpty, ...updateUser} = user;

    if (updateUser.dateOfBirth !== getState().firebase.profile.dateOfBirth) {
        updateUser.dateOfBirth = moment(updateUser.dateOfBirth).toDate();
    }


    try {
        await firebase.updateProfile(updateUser);
        toastr.success(
            "Yes!",
            "Votre profil à été mis à jour",
            {icon: (<Emoji emoji='sunglasses' size={45} native/>)}
        );
    } catch (e) {
        console.log(e);
    }
};

export const deleteProfile = () => async (dispatch, getState, {getFirestore, getFirebase}) => {
    const firestore = getFirestore();
    const firebase = getFirebase();
    const user = firestore.auth().currentUser;
    const toastrConfirmOptions = { okText : 'Confirmer', cancelText: 'Annuler' };
    //console.log('delete user', user);
    try {
        toastr.confirm('Êtes-vous sur ?',  toastrConfirmOptions, {
            onOk: () => {
                firestore.delete(`users/${user.uid}`);
                firebase.auth().currentUser.delete()
                    .then(() => {
                        // console.log('user deleted');
                        window.location.assign('/');
                    })
                    .catch((e) => {
                        console.log({e});
                    })
            }
        });
    } catch (e) {
        console.log(e);
    }
};


/**
 *
 * @param file
 * @param fileName
 * @returns {Function}
 */
export const uploadProfilImage = (file, fileName) =>
    async (dispatch, getState, {getFirebase, getFirestore}) => {
        const imageName = cuid();
        const firestore = getFirestore();
        const firebase = getFirebase();
        const user = firebase.auth().currentUser;
        const path = `${user.uid}/user_images`;
        const options = {
            name: imageName
        };
        try {
            dispatch(asyncActionStart());
            // upload file to firebase
            let uploadedFile = await firebase.uploadFile(path, file, null, options);
            // get url of image
            let downloadURL = await uploadedFile.uploadTaskSnaphot.downloadURL;
            // get user document
            let userDoc = await firestore.get(`users/${user.uid}`);
            // check if user has photo
            if (!userDoc.data().photoURL) {
                await firebase.updateProfile({
                    photoURL: downloadURL
                });
                await user.updateProfile({
                    photoURL: downloadURL
                })
            }
            // add new photo
            await firestore.add({
                collection: 'users',
                doc: user.uid,
                subcollections: [{collection: 'photos'}]
            }, {
                name: imageName,
                url: downloadURL
            });
            dispatch(asyncActionFinish());
        } catch (e) {
            console.log(e);
            dispatch(asyncActionError());
            throw new Error('Prblème lors du téléchargement');
        }
    };

/**
 *
 * @param photo
 * @returns {Function}
 */
export const deletePhoto = (photo) =>
    async (dispatch, getState, {getFirebase, getFirestore}) => {
        const firestore = getFirestore();
        const firebase = getFirebase();
        const user = firebase.auth().currentUser;

        try {
            await firebase.deleteFile(`${user.uid}/user_images/${photo.name}`);
            await firestore.delete({
                collection: 'users',
                doc: user.uid,
                subcollections: [{collection: 'photos', doc: photo.id}]
            })
        } catch (e) {
            console.log(e);
            throw new Error('Il semble y avoir un léger problème…');
        }
    };


/**
 *
 * @param photo
 * @returns {Function}
 */
export const setMainPhoto = (photo) =>
    async (dispatch, getState) => {
        dispatch(asyncActionStart());
        const firestore = firebase.firestore();
        const user = firebase.auth().currentUser;
        const today = new Date(Date.now());
        let userDocRef = firestore.collection('users').doc(user.uid);
        let eventAttendeeRef = firestore.collection('event_attendee');
        try {
            let batch = firestore.batch();

            await batch.update(userDocRef, {
                photoURL: photo.url
            });

            let eventQuery = await eventAttendeeRef
                .where('userUid', '==', user.uid)
                .where('eventDate', '>', today);

            let eventQuerySnap = await eventQuery.get();

            for (let i = 0; i < eventQuerySnap.docs.length; i++) {
                let eventDocRef = await firestore
                    .collection('events')
                    .doc(eventQuerySnap.docs[i].data().eventId);

                let event = await eventDocRef.get();

                if (event.data().hostUid === user.uid) {
                    batch.update(eventDocRef, {
                        hostPhotoURL: photo.url,
                        [`attendees.${user.uid}.photoURL`]: photo.url
                    })
                } else {
                    batch.update(eventDocRef, {
                        [`attendees.${user.uid}.photoURL`]: photo.url
                    })
                }
            }
            console.log(batch);
            await batch.commit();
            dispatch(asyncActionFinish());
        } catch (e) {
            dispatch(asyncActionError());
            console.log(e);
            throw new Error('Impossible de mettre à jour la photo…');
        }

    };

/**
 *
 * @param event
 * @returns {Function}
 */
export const goingToEvent = (event) =>
    async (dispatch, getState) => {
        dispatch(asyncActionStart());
        const firestore = firebase.firestore();
        const user = firebase.auth().currentUser;
        const profile = getState().firebase.profile;
        const attendee = {
            going: true,
            joinDate: Date.now(),
            photoURL: profile.photoURL || '/assets/user.png',
            displayName: profile.displayName,
            host: false
        };

        try {
            let eventDocRef = firestore.collection('events').doc(event.id);
            let eventAttendeeDocRef = firestore.collection('event_attendee').doc(`${event.id}_${user.uid}`);

            await firestore.runTransaction(async transaction => {
                await transaction.get(eventDocRef);
                await transaction.update(eventDocRef, {
                    [`attendees.${user.uid}`]: attendee
                });
                await transaction.set(eventAttendeeDocRef, {
                    eventId: event.id,
                    userUid: user.uid,
                    eventDate: event.date,
                    host: false
                });
            });

            dispatch(asyncActionFinish());
            toastr.success(
                "Alright",
                "Vous êtes bien inscrit à l'Events!",
                {icon: (<Emoji emoji='fire' size={45} native/>)}
            );

        } catch (e) {
            dispatch(asyncActionError());
            console.log(e);
            toastr.error(
                "Aïe!",
                "Il semble y avoir un problème avec cet Events",
                {icon: (<Emoji emoji='sweat_smile' size={45} native/>)}
            );
        }
    };

/**
 *
 * @param event
 * @returns {Function}
 */
export const cancelGoingToEvent = (event) =>
    async (dispatch, getState, {getFirestore}) => {
        const firestore = getFirestore();
        const user = firestore.auth().currentUser;

        try {
            await firestore.update(`events/${event.id}`, {
                [`attendees.${user.uid}`]: firestore.FieldValue.delete()
            });

            await firestore.delete(`event_attendee/${event.id}_${user.uid}`);

            toastr.success(
                "D'accord",
                "Vous êtes bien désinscrit de l'Events!",
                {icon: (<Emoji emoji='pensive' size={45} native/>)}
            );

        } catch (e) {
            console.log(e);
            toastr.error(
                "Aïe!",
                "Il semble y avoir un problème avec cet Events",
                {icon: (<Emoji emoji='sweat_smile' size={45} native/>)})
        }
    };

/**
 *
 * @param userUid
 * @param activeTab
 * @returns {Function}
 */
export const getUserEvents = (userUid, activeTab) => async (dispatch, getState) => {
    dispatch(asyncActionStart());
    const firestore = firebase.firestore();
    const today = new Date(Date.now());
    let eventsRef = firestore.collection('event_attendee');
    let query;

    switch (activeTab) {
        case 1: // past events
            query = eventsRef
                .where('userUid', '==', userUid)
                .where('eventDate', '<=', today)
                .orderBy('eventDate', 'desc');
            break;
        case 2: // future events
            query = eventsRef
                .where('userUid', '==', userUid)
                .where('eventDate', '>=', today)
                .orderBy('eventDate');
            break;
        case 3: // hosted events
            query = eventsRef
                .where('userUid', '==', userUid)
                .where('host', '==', true)
                .orderBy('eventDate', 'desc');
            break;
        default:
            query = eventsRef.where('userUid', '==', userUid).orderBy('eventDate', 'desc');
    }

    try {
        let querySnap = await query.get();
        let events = [];

        for (let i = 0; i < querySnap.docs.length; i++) {
            let evt = await firestore.collection('events')
                .doc(querySnap.docs[i]
                    .data().eventId)
                .get();
            events.push({...evt.data(), id: evt.id});
        }

        dispatch({type: FETCH_EVENTS, payload: {events}});

        dispatch(asyncActionFinish());
    } catch (e) {
        console.log(e);
        dispatch(asyncActionError())
    }
};

/**
 *
 * @param userToFollow
 * @returns {Function}
 */
export const followUser = userToFollow => async (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore();
    const user = firestore.auth().currentUser;
    const following = {
        photoURL: userToFollow.photoURL || 'assets/users.png',
        city: userToFollow.city || 'Inconnu',
        displayName: userToFollow.displayName
    };

    try {
        await firestore.set(
            {
                collection: 'users',
                doc: user.uid,
                subcollections: [{collection: 'following', doc: userToFollow.id}]
            },
            following
        )
    } catch (e) {
        console.log(e);
    }
};

/**
 *
 * @param userToUnfollow
 * @returns {Function}
 */
export const unFollowUser = userToUnfollow => async (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore();
    const user = firestore.auth().currentUser;
    try {
        await firestore.delete({
            collection: 'users',
            doc: user.uid,
            subcollections: [{collection: 'following', doc: userToUnfollow.id}]
        })
    } catch (e) {
        console.log(e);
    }
};