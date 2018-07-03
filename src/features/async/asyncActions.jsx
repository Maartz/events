import {ASYNC_ACTION_START, ASYNC_ACTION_ERROR, ASYNC_ACTION_FINISH} from "./asyncConstants";

/**
 *
 * @returns {{type: string}}
 */
export const asyncActionStart = () => {
    return {
        type: ASYNC_ACTION_START
    }
};

/**
 *
 * @returns {{type: string}}
 */
export const asyncActionFinish = () => {
    return {
        type: ASYNC_ACTION_FINISH
    }
};

/**
 *
 * @returns {{type: string}}
 */
export const asyncActionError = () => {
    return {
        type: ASYNC_ACTION_ERROR
    }
};