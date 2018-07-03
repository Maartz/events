import {LOGIN_USER, SIGN_OUT_USER} from "./authConstants";
import {createReducer} from "../../app/common/util/reducerUtil";

/**
 *
 * @type {{currentUser: {}}}
 */
const initialState = {
    currentUser : {}
};

/**
 *
 * @param state
 * @param payload
 * @returns {{authenticated: boolean, currentUser: *}}
 */
export const loginUser = (state, payload) => {
    return {
        ...state,
        authenticated: true,
        currentUser: payload.creds.email
    }
};

/**
 *
 * @param state
 * @param payload
 * @returns {{authenticated: boolean, currentUser: {}}}
 */
export const signOutUser = (state, payload) => {
    return {
        ...state,
        authenticated:false,
        currentUser: {}
    }
};


export default createReducer(initialState, {
    [LOGIN_USER]: loginUser,
    [SIGN_OUT_USER]: signOutUser
});