import firebase from 'firebase';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDkn7_cTWuOcv7NZ2H-1hM0ulZ98w-FK8Y",
    authDomain: "revents-206917.firebaseapp.com",
    databaseURL: "https://revents-206917.firebaseio.com",
    projectId: "revents-206917",
    storageBucket: "revents-206917.appspot.com",
    messagingSenderId: "424652201030"
};

firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore();

// Create a new settings for FireStore update to 4.13 to avoid breaking changes

const settings = {
    timestampsInSnapshots: true,
};

firestore.settings(settings);

export default firebase;