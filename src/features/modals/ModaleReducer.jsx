import {MODALE_CLOSE, MODALE_OPEN} from "./ModaleConstants";
import {createReducer} from "../../app/common/util/reducerUtil";

const initialeState = null;

export const openModale = (state,payload) => {
    const {modaleType, modaleProps} = payload;
    return{modaleType, modaleProps};
};

export const closeModale = (state, payload) => {
    return null;
};

export default createReducer(initialeState ,{
    [MODALE_OPEN]: openModale,
    [MODALE_CLOSE]: closeModale
})