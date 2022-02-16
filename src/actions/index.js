export const CHANGE_LOGIN = 'CHANGE_EMAIL';
export const GET_TOKEN_SUCCESS = 'GET_TOKEN_SUCCESS';
export const GET_TOKEN_NEW = 'GET_TOKEN_NEW';

export const changeLogin = (payload) => ({
  type: CHANGE_LOGIN,
  payload,
});

export const getTokenSuccess = (payload) => ({
  type: GET_TOKEN_SUCCESS,
  payload,
});

export const getNewToken = (payload) => ({
  type: GET_TOKEN_NEW,
  payload,
});
