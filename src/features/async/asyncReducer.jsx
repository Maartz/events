import {createReducer} from "../../app/common/util/reducerUtil";
import {ASYNC_ACTION_START, ASYNC_ACTION_FINISH, ASYNC_ACTION_ERROR} from "./asyncConstants";

/**
 *
 * @type {{loading: boolean}}
 */
const initialState = {
    loading: false
};

/**
 *
 * @param state
 * @returns {{loading: boolean}}
 */
export const asyncActionStarted = (state) => {
    return {...state, loading: true};
};

/**
 *
 * @param state
 * @returns {{loading: boolean}}
 */
export const asyncActionFinished = (state) => {
    return {...state, loading: false}
};

/**
 *
 * @param state
 * @returns {{loading: boolean}}
 */
export const asyncActionError = (state) => {
    return {...state, loading: false}
};

/**
 *
 */
export default createReducer(initialState, {
    [ASYNC_ACTION_START]: asyncActionStarted,
    [ASYNC_ACTION_FINISH]: asyncActionFinished,
    [ASYNC_ACTION_ERROR]: asyncActionError
})