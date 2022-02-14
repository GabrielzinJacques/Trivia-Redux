import { combineReducers } from 'redux';
import userReducer from './Login';

const rootReducer = combineReducers({ userReducer });

export default rootReducer;
