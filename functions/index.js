const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

/**
 *
 * @param type
 * @param event
 * @param id
 * @returns {{type: *, eventDate: *, hostedBy: (*|string), title: *, photoURL: (*|string), timestamp: firebase.firestore.FieldValue | *, hostUid: *, eventId: *}}
 */
const newActivity = (type, event, id) => {
    return {
        type: type,
        eventDate: event.date,
        hostedBy: event.hostedBy,
        title: event.title,
        photoURL: event.hostPhotoURL,
        timestamp: admin.firestore.FieldValue.serverTimestamp(),
        hostUid: event.hostUid,
        eventId: id
    };
};

/**
 *
 * @type {CloudFunction<DocumentSnapshot>}
 */
exports.createActivity = functions.firestore.document('events/{eventId}').onCreate(event => {
    let newEvent = event.data();

    console.log(newEvent);

    const activity = newActivity('newEvent', newEvent, event.id);

    console.log(activity);

    return admin
        .firestore()
        .collection('activity')
        .add(activity)
        .then(docRef => {
            return console.log('Activity created with id: ', docRef.id);
        })
        .catch(err => {
            return console.log('Error adding activity', err);
        });
});

/**
 *
 * @type {CloudFunction<Change<DocumentSnapshot>>}
 */
exports.cancelActivity = functions.firestore.document('events/{eventId}').onUpdate((event, context) => {
    let updatedEvent = event.after.data();
    let previousEventData = event.before.data();
    console.log({event});
    console.log({context});
    console.log({updatedEvent});
    console.log({previousEventData});

    if (!updatedEvent.cancelled || updatedEvent.cancelled === previousEventData.cancelled) {
        return false;
    }

    const activity = newActivity('cancelledEvent', updatedEvent, context.params.eventId);

    console.log({activity});

    return admin
        .firestore()
        .collection('activity')
        .add(activity)
        .then(docRef => {
            return console.log('Activity created with id: ', docRef.id);
        })
        .catch(err => {
            return console.log('Error adding activity', err);
        });
});

/**
 *
 * @type {CloudFunction<DocumentSnapshot>}
 */
exports.userFollowing = functions.firestore
    .document('users/{followerUid}/following/{followingUid}')
    .onCreate((event, context) => {
        console.log('v1');
        const followerUid = context.params.followerUid;
        const followingUid = context.params.followingUid;

        const followerDoc = admin
            .firestore()
            .collection('users')
            .doc(followerUid);

        console.log(followerDoc);

        return followerDoc.get().then(doc => {
            let userData = doc.data();
            console.log({userData});
            let follower = {
                displayName: userData.displayName,
                photoURL: userData.photoURL || '/assets/user.png',
                city: userData.city || 'Inconnu'
            };
            return admin
                .firestore()
                .collection('users')
                .doc(followingUid)
                .collection('followers')
                .doc(followerUid)
                .set(follower);
        });
    });

/**
 *
 * @type {CloudFunction<DocumentSnapshot>}
 */
exports.unFollowUser = functions.firestore
    .document('users/{followerUid}/following/{followingUid}')
    .onDelete((event, context) => {
        return admin
            .firestore()
            .collection('users')
            .doc(context.params.followingUid)
            .collection('followers')
            .doc(context.params.followerUid)
            .delete()
            .then(() => {
                return console.log('document deleted');
            })
            .catch(err => console.log(err))
    });