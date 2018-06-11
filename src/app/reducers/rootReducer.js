import {combineReducers} from 'redux';
import { reducer as FormReducer } from 'redux-form'
import testReducer from '../../features/testarea/testReducer';
import eventReducer from '../../features/event/EventReducer';
import ModalReducer from "../../features/modals/ModalReducer";

const rootReducer = combineReducers({
    form: FormReducer,
    test: testReducer,
    events: eventReducer,
    modals: ModalReducer
});

export default rootReducer;