import { GET_FEEDBACK } from '../actions';

const INITIAL_STATE = {
  image: '',
  score: 0,
};

const headerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_FEEDBACK:
    localStorage.setItem('score', action.payload.score);
    return {
      ...state,
      score: action.payload.score,
      image: action.payload.image,
    };
  default:
    return state;
  }
};

export default headerReducer;
