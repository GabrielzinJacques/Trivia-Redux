import { GET_FEEDBACK, GET_SCORE } from '../actions';

const INITIAL_STATE = {
  image: '',
  score: 0,
  assertions: 0,
};

const headerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_FEEDBACK:
    return {
      ...state,
      image: action.payload.image,

    };
  case GET_SCORE:
    localStorage.setItem('score', action.score);
    return {
      ...state,
      score: state.score + action.score,
      assertions: state.assertions + 1,
    };
  default:
    return state;
  }
};

export default headerReducer;
