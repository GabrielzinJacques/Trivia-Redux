import { combineReducers } from 'redux';
import userReducer from './Login';
import tokenReducer from './token';

const rootReducer = combineReducers({ userReducer, token: tokenReducer });

export default rootReducer;
