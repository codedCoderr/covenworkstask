import {
  FETCH_ARRIVALS_SUCCESS,
  FETCH_ARRIVALS_FAIL,
  FETCH_DEPARTURES_SUCCESS,
  FETCH_DEPARTURES_FAIL,
  LOADING
} from '../actions/types';
const initialState = {
  arrivals: [],
  departure: [],
  error: null,
  loading:false
};
export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case FETCH_ARRIVALS_SUCCESS:
      return {
        ...state,
        arrivals: payload,
        loading: false
      };
    case FETCH_ARRIVALS_FAIL:
      return {
        ...state,
        error: payload,
        arrivals: [],
        loading: false
      };
    case FETCH_DEPARTURES_SUCCESS:
      return {
        ...state,
        departure: payload,
        loading: false
      };
    case FETCH_DEPARTURES_FAIL:
      return {
        ...state,
        error: payload,
        departure: [],
        loading: false
      };
    case LOADING:
      return { ...state, loading: !0 };
    default:
      return state;
  }
}
