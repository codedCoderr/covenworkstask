import {
  FETCH_ARRIVALS_SUCCESS,
  FETCH_ARRIVALS_FAIL,
  FETCH_DEPARTURES_SUCCESS,
  FETCH_DEPARTURES_FAIL
} from '../actions/types';
const initialState = {
  arrivals: [],
  departure: [],
  error: null
};
export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case FETCH_ARRIVALS_SUCCESS:
      return {
        ...state,
        arrivals: payload
      };
    case FETCH_ARRIVALS_FAIL:
      return {
        ...state,
        error: payload
      };
    case FETCH_DEPARTURES_SUCCESS:
      return {
        ...state,
        arrivals: payload
      };
    case FETCH_DEPARTURES_FAIL:
      return {
        ...state,
        error: payload
      };

    default:
      return state;
  }
}
