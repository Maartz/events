// Actions creators
import React from 'react'
import {SubmissionError, reset} from 'redux-form'
import {toastr} from 'react-redux-toastr'
import {closeModal} from "../modals/ModalActions";
import {Emoji} from "emoji-mart";


const errorCode = [
    {
        error : "auth/wrong-password",
        message : "Mot de passe éronné"
    },
    {
        error : "auth/user-not-found",
        message: "Utilisateur inexistant"
    },
    {
        error: "auth/argument-error",
        message: "Un des arguments semble être invalide"
    }
];


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
                _error: error.message
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
    firebase.auth().useDeviceLanguage();
    try {
        // Create the user in auth
        let createdUser = await firebase.auth()
            .createUserWithEmailAndPassword(user.email, user.password);
        // Define language
        firebase.auth().useDeviceLanguage();
        // Send email for verification
        await createdUser.sendEmailVerification();
        toastr.success(
            'TADA !!',
            `Un petit mail viens de partir dans ta boite mail
            Clic vite sur le lien pour valider ton compte.`,
            {icon: (<Emoji emoji='tada' size={45} native/>)}
        );

        // update the auth profile
        await createdUser.updateProfile({
            displayName: user.displayName
        });
        // create a new profile in firestore
        let newUser = {
            displayName: user.displayName,
            createdAt: firestore.FieldValue.serverTimestamp(),
            acceptedConfidentiality: true
        };
        await firestore.set(`users/${createdUser.uid}`, {...newUser});
        dispatch(closeModal());
    } catch (e) {
        throw new SubmissionError({
            _error: e.message
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
            });
            // Define language
            firebase.auth().useDeviceLanguage();
            // Send email for verification
            await user.sendEmailVerification();
            toastr.success(
                'TADA !!',
                `Un petit mail viens de partir dans ta boite mail
                Clic vite sur le lien pour valider ton compte.`,
                {icon: (<Emoji emoji='tada' size={45} native/>)}
            );
        }
        dispatch(closeModal());
    } catch (e) {
        // console.log(e);
        throw new SubmissionError({
            _error: e.message
        })
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
        toastr.success(
            'TADA !!',
            `Votre mot de passe est à jour.`,
            {icon: (<Emoji emoji='tada' size={45} native/>)}
        );
    } catch (error) {
        throw new SubmissionError({
            _error: 'Échec de mise à jour du mot de passe',
        })
    }
};


/**
 *
 * @param user
 * @returns {Function}
 */
export const resetPassword = (user) => async (dispatch, getState, {getFirebase}) => {
    const firebase = getFirebase();
    try {

        // Create the user in auth
        let auth = await firebase.auth();

        // Get submitted email
        let emailAddress = user.email;

        // Define language
        firebase.auth().useDeviceLanguage();

        await auth.sendPasswordResetEmail(emailAddress);

        toastr.success(
            'TADA !!',
            `Un petit mail viens de partir dans ta boite mail.`,
            {icon: (<Emoji emoji='tada' size={45} native/>)}
        );

    } catch (e) {
        console.log(e);
        throw new SubmissionError({
            _error: 'Oups, quelque chose ne va pas.'
        })
    }
};


/**
 *
 * @param creds
 * @returns {Function}
 */
export const updateEmail = (creds) => async (dispatch, getState, {getFirebase}) => {
    const firebase = getFirebase();
    const user = firebase.auth().currentUser;
    try {
        await user.updateEmail(creds.newEmail1);
        await dispatch(reset('account'));
        toastr.success(
            'TADA !!',
            `Votre email est à jour.`,
            {icon: (<Emoji emoji='tada' size={45} native/>)}
        );
    } catch (error) {
        throw new SubmissionError({
            _error: 'Échec de mise à jour de l\'e-mail ',
        })
    }
};




