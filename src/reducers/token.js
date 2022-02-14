import { GET_TOKEN_SUCCESS } from '../actions';

const INITIAL_STATE = '';

const tokenReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_TOKEN_SUCCESS:
    localStorage.setItem('token', action.payload.token);
    return action.payload.token;
  default:
    return state;
  }
};

export default tokenReducer;
