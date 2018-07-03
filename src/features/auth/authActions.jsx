// Actions creators

import {SubmissionError, reset} from 'redux-form'
import {toastr} from 'react-redux-toastr'
import {closeModal} from "../modals/ModalActions";

/**
 *
 * @param creds
 * @returns {Function}
 */
export const login = (creds) => {
    return async (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();
        try {
            await firebase.auth().signInWithEmailAndPassword(creds.email, creds.password);
            dispatch(closeModal());
        } catch (error) {
            console.log(error);
            throw new SubmissionError({
                _error: 'Échec de connexion'
            })
        }
    }
};

/**
 *
 * @param user
 * @returns {Function}
 */
export const registerUser = (user) => async (dispatch, getState, {getFirebase, getFirestore}) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    try {
        // Create the user in auth
        let createdUser = await firebase.auth()
            .createUserWithEmailAndPassword(user.email, user.password);
        console.log(createdUser);
        // update the auth profile
        await createdUser.updateProfile({
            displayName: user.displayName
        })
        // create a new profile in firestore
        let newUser = {
            displayName: user.displayName,
            createdAt: firestore.FieldValue.serverTimestamp()
        };
        await firestore.set(`users/${createdUser.uid}`, {...newUser})
        dispatch(closeModal());
    } catch (e) {
        console.log(e);
        throw new SubmissionError({
            _error: 'Oups, quelque chose ne va pas.'
        })
    }
};

/**
 *
 * @param selectProvider
 * @returns {Function}
 */
export const socialLogin = (selectProvider) => async (dispatch, getState, {getFirebase, getFirestore}) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    try {
        let user = await firebase.login({
            provider: selectProvider,
            type: 'popup'
        });
        if (user.additionalUserInfo.isNewUser) {
            dispatch(closeModal());
            await firestore.set(`users/${user.user.uid}`, {
                displayName: user.profile.displayName,
                photoURL: user.profile.avatarUrl,
                createdAt: firestore.FieldValue.serverTimestamp()
            })
        }
        dispatch(closeModal());
    } catch (e) {
        console.log(e);
    }
};

/**
 *
 * @param creds
 * @returns {Function}
 */
export const updatePassword = (creds) => async (dispatch, getState, {getFirebase}) => {
    const firebase = getFirebase();
    const user = firebase.auth().currentUser;
    try {
        await user.updatePassword(creds.newPassword1);
        await dispatch(reset('account'));
        toastr.success('Bravo !', 'Votre mot de passe a été mis à jour.')
    } catch (error) {
        throw new SubmissionError({
            _error: 'Échec de mise à jour du mot de passe',
        })
    }
};



