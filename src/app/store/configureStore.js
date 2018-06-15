import {createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension'
import rootReducer from '../reducers/rootReducer';
import {reactReduxFirebase, getFirebase} from 'react-redux-firebase';
import {reduxFirestore, getFirestore} from 'redux-firestore';
import thunk from 'redux-thunk';
import firebase from '../config/firebase';

// React redux firebase config
const rrfConfig = {
    userProfile: 'users',
    attachAuthIsReady: true,
    useFirestoreForProfile: true
}


export const configureStore = (preloadState) => {
    const middlewares = [thunk.withExtraArgument({getFirebase, getFirestore})];
    const middlewareEnhancer = applyMiddleware(...middlewares);

    const storeEnhancers = [middlewareEnhancer];

    const composedEnhancer = composeWithDevTools(...storeEnhancers, reactReduxFirebase(firebase, rrfConfig), reduxFirestore(firebase));

    const store = createStore(
        rootReducer,
        preloadState,
        composedEnhancer
    );

    // HMR for Redux
    if (process.env.NODE_ENV !== 'production') {
        if (module.hot) {
            module.hot.accept('../reducers/rootReducer', () => {
                const newRootReducer = require('../reducers/rootReducer').default
                store.replaceReducer(newRootReducer);
            })
        }
    }

    return store;
};