import moment from 'moment';
import {toastr} from 'react-redux-toastr';
import cuid from 'cuid';
import {asyncActionStart, asyncActionError, asyncActionFinish} from "../async/asyncActions";


export const updateProfile = (user) => async (dispatch, getState, {getFirebase}) => {
    const firebase = getFirebase();
    const {isLoaded, isEmpty, ...updateUser} = user;

    if (updateUser.dateOfBirth !== getState().firebase.profile.dateOfBirth) {
        updateUser.dateOfBirth = moment(updateUser.dateOfBirth).toDate();
    }


    try {
        await firebase.updateProfile(updateUser);
        toastr.success('Bravo !', 'Votre profil à été mis à jour.')
    } catch (e) {
        console.log(e);
    }
};

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
            })
            dispatch(asyncActionFinish());
        } catch (e) {
            console.log(e);
            dispatch(asyncActionError());
            throw new Error('Prblème lors du téléchargement');
        }
    };

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


export const setMainPhoto = (photo) =>
    async (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();
        try {
            return await firebase.updateProfile({
                photoURL: photo.url
            });
        } catch (e) {
            console.log(e);
            throw new Error('Aïe aïe, on arrive pas à mettre à jour la photo…');
        }

    }