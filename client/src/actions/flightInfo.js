import {
  FETCH_DEPARTURES_SUCCESS,
  FETCH_DEPARTURES_FAIL,
  FETCH_ARRIVALS_SUCCESS,
  FETCH_ARRIVALS_FAIL,
  LOADING
} from './types';

import axios from 'axios';
// const base_url = 'https://covenworks.herokuapp.com';
const base_url = 'http://localhost:3500';

export const fetchArrivals = (airport, days) => async dispatch => {
  const body = JSON.stringify({ airport, days});
    dispatch({ type: LOADING });

  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  };
  try {
    const response = await axios.post(
      base_url + '/api/v1/arrival',
      body,
      config
    );

    if (response.data.success) {
      dispatch({ type: FETCH_ARRIVALS_SUCCESS, payload: response.data });
    } else {
      dispatch({ type: FETCH_ARRIVALS_FAIL, payload: response.data.message });
    }
  } catch (error) {
    dispatch({ type: FETCH_ARRIVALS_FAIL, payload: error.toString() });
  }
};
export const fetchDepartures = (airport,days) => async dispatch => {
  const body = JSON.stringify({ airport,days });
    dispatch({ type: LOADING });

  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  };
  try {
    const response = await axios.post(
      base_url + '/api/v1/departure',
      body,
      config
    );
    console.log(response.data)
    if (response.data.success) {
      dispatch({ type: FETCH_DEPARTURES_SUCCESS, payload: response.data });
    } else {
      dispatch({ type: FETCH_DEPARTURES_FAIL, payload: response.data.message });
    }
  } catch (error) {
    dispatch({ type: FETCH_DEPARTURES_FAIL, payload: error.toString() });
  }
};
