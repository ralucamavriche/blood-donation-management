import { combineReducers } from 'redux';
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import donorReducer from './donorReducer';
import requestReducer from './requestReducer';
import mainReducer from './mainReducer';

export default combineReducers({
    error: errorReducer,
    auth: authReducer,
    donor: donorReducer,
    request: requestReducer,
    main: mainReducer
});