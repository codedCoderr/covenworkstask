import {
  CLEAR_PROFILE,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  LOADING,
  NOT_LOADING
} from './types';
import { setAlert } from './alert';
import axios from 'axios';
const base_url = 'https://covenworks.herokuapp.com';
// const base_url = 'http://localhost:3500';
export const login = (username, password, history) => async dispatch => {
  const body = JSON.stringify({ username, password });
  dispatch({ type: LOADING });
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  };
  try {
    const response = await axios.post(
      base_url + '/api/v1/auth/login',
      body,
      config
    );
    if (response.data.success) {
      dispatch({ type: LOGIN_SUCCESS, payload: response.data });
      dispatch(setAlert('Login was successful', 'success'));
      history.push('/dashboard');
    } else {
      dispatch(setAlert(response.data.message, 'danger'));
      dispatch({ type: LOGIN_FAIL, payload: response.data.message });
    }
  } catch (error) {
    dispatch(setAlert(error.toString(), 'danger'));
    dispatch({ type: LOGIN_FAIL, payload: error.toString() });
  }
};

export const logout = () => async dispatch => {
  dispatch({ type: CLEAR_PROFILE });
  dispatch({ type: LOGOUT });
  dispatch(setAlert('Logout was successful', 'success'));
};
export const notLoading = () => async dispatch => {
  dispatch({ type: NOT_LOADING });
};
