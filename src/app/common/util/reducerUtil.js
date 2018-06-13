// Function that receive an initial state (in constants) and a function (in actions) from a Reducer
// This is a reusable method, used everywhere for creating Reducer

export const createReducer = (initialState, fnMap) => {
    return (state = initialState, {type, payload}) => {
        const handler = fnMap[type];

        return handler ? handler(state, payload) : state;
    }
};