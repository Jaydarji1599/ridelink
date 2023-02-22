import { combineReducers } from 'redux';
import rides from './rides';
import auth from './auth'
export default combineReducers({
    rides,
    auth
});