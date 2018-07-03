import {createReducer} from "../../app/common/util/reducerUtil";
import { CREATE_EVENT, DELETE_EVENT, UPDATE_EVENT, FETCH_EVENTS} from "./EventConstant";


// Mock of datas
/**
 *
 * @type {Array}
 */
const initialState = [];

// Create a new copy of the initialState array with the new event
/**
 *
 * @param state
 * @param payload
 * @returns {*[]}
 */
export const createEvent = (state, payload) => {
  return [...state, Object.assign({}, payload.event)]
};

// Create a new copy of the initialState array filtered by the event.id
// and assign the payload into an new object
/**
 *
 * @param state
 * @param payload
 * @returns {*[]}
 */
export const updateEvent = (state, payload) => {
    return [
        ...state.filter(event => event.id !== payload.event.id),
        Object.assign({}, payload.event)
    ]
};

// Create a new copy of the initialState array filtered by the eventId
/**
 *
 * @param state
 * @param payload
 * @returns {*[]}
 */
export const deleteEvent = (state, payload) => {
    return [ ...state.filter(event => event.id !== payload.eventId)]
};

// Add events to the payload
/**
 *
 * @param state
 * @param payload
 * @returns {Array}
 */
export const fetchEvents = (state, payload) => {
    return payload.events
};

// createReducer from app/common/util/reducerUtil.js
// Avoids using long and verbose switch statement

export default createReducer(initialState, {
    [CREATE_EVENT]: createEvent,
    [UPDATE_EVENT]: updateEvent,
    [DELETE_EVENT]: deleteEvent,
    [FETCH_EVENTS]: fetchEvents
});