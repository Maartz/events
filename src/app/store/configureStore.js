import { createStore, applyMiddleware } from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension'
import rootReducer from '../reducers/rootReducer';
import thunk from 'redux-thunk'


export const configureStore = (preloadState) => {
    const middlewares = [thunk];
    const middlewareEnhancer = applyMiddleware(...middlewares);

    const storeEnhancers = [middlewareEnhancer];

    const composedEnhancer = composeWithDevTools(...storeEnhancers);

    const store = createStore(
        rootReducer,
        preloadState,
        composedEnhancer
    );

    // HMR for Redux
    if(process.env.NODE_ENV !== 'production') {
        if(module.hot) {
            module.hot.accept('../reducers/rootReducer', () => {
                const newRootReducer = require('../reducers/rootReducer').default
                store.replaceReducer(newRootReducer);
            })
        }
    }

    return store;
};