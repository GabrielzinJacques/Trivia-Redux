import { GET_FEEDBACK, GET_SCORE, RESET, SET_RANKING } from '../actions';

const INITIAL_STATE = {
  image: '',
  score: 0,
  assertions: 0,
  ranking: [],
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
  case SET_RANKING:
    return {
      ...state,
      ranking: [...state.ranking, action.ranking],
    };
  case RESET:
    return {
      ...state,
      image: '',
      score: 0,
      assertions: 0,
    };
  default:
    return state;
  }
};

export default headerReducer;
