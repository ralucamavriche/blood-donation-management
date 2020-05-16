import { combineReducers } from 'redux';
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import donorReducer from './donorReducer';

export default combineReducers({
    error: errorReducer,
    auth: authReducer,
    donor: donorReducer
});