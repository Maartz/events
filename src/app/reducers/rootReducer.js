import {combineReducers} from 'redux';
import { reducer as FormReducer } from 'redux-form'
import testReducer from '../../features/testarea/testReducer';
import eventReducer from '../../features/event/EventReducer';
import ModaleReducer from "../../features/modals/ModaleReducer";

const rootReducer = combineReducers({
    form: FormReducer,
    test: testReducer,
    events: eventReducer,
    modales: ModaleReducer
});

export default rootReducer;