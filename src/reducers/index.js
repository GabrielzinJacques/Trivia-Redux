import { combineReducers } from 'redux';
import userReducer from './Login';
import tokenReducer from './token';
import headerReducer from './Header';

const rootReducer = combineReducers({
  userReducer,
  token: tokenReducer,
  player: headerReducer });

export default rootReducer;
