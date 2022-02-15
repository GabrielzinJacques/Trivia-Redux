import tokenObj from '../Services/api';

export const CHANGE_LOGIN = 'CHANGE_EMAIL';
export const GET_TOKEN_SUCCESS = 'GET_TOKEN_SUCCESS';

export const changeLogin = (payload) => ({
  type: CHANGE_LOGIN,
  payload,
});

export const getTokenSuccess = (payload) => ({
  type: GET_TOKEN_SUCCESS,
  payload,
});

export const getTokenThunk = () => async (dispatch) => {
  try {
    const results = await tokenObj();
    dispatch(getTokenSuccess(results));
  } catch (error) {
    return error;
  }
};
