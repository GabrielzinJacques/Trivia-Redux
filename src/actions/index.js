export const CHANGE_LOGIN = 'CHANGE_EMAIL';
export const GET_TOKEN_SUCCESS = 'GET_TOKEN_SUCCESS';
export const GET_FEEDBACK = 'GET_FEEDBACK';
export const GET_SCORE = 'GET_SCORE';
export const SET_RANKING = 'SET_RANKING';
export const RESET = 'RESET';

export const getFeedBack = (payload) => ({
  type: GET_FEEDBACK,
  payload,
});

export const changeLogin = (payload) => ({
  type: CHANGE_LOGIN,
  payload,
});

export const getTokenSuccess = (payload) => ({
  type: GET_TOKEN_SUCCESS,
  payload,
});

export const getScore = (score) => ({
  type: GET_SCORE,
  score,
});

export const setRanking = (ranking) => ({
  type: SET_RANKING,
  ranking,
});

export const reset = () => ({
  type: RESET,
});
