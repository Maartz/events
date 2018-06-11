import {MODALE_CLOSE, MODALE_OPEN} from "./ModaleConstants";

export const openModale = (modaleType, modaleProps) => {
    return {
        type: MODALE_OPEN,
        payload: {
            modaleProps,
            modaleType
        }
    }
};

export const closeModale = () => {
    return {
        type: MODALE_CLOSE,
    }
};
