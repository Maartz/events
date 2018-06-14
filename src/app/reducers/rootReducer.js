import {combineReducers} from 'redux';
import { reducer as FormReducer } from 'redux-form'
import testReducer from '../../features/testarea/testReducer';
import eventReducer from '../../features/event/EventReducer';
import ModalReducer from "../../features/modals/ModalReducer";
import authReducer from "../../features/auth/authReducer";
import asyncReducer from "../../features/async/asyncReducer";

const rootReducer = combineReducers({
    form: FormReducer,
    test: testReducer,
    events: eventReducer,
    modals: ModalReducer,
    auth: authReducer,
    async: asyncReducer
});

export default rootReducer;