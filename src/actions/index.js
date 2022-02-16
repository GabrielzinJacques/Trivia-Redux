export const CHANGE_LOGIN = 'CHANGE_EMAIL';
export const GET_TOKEN_SUCCESS = 'GET_TOKEN_SUCCESS';
export const GET_FEEDBACK = 'GET_FEEDBACK';

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
