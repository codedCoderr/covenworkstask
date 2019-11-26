import {
  LOGIN_SUCCESS,
  LOGOUT,
  LOADING,
  NOT_LOADING
} from '../actions/types';
const initialState = {
  token: localStorage.getItem('token'),
  loading: !1,
  user: {},
};
export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case LOGIN_SUCCESS:
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        token: payload.token,
        isAuthenticated: !0,
        loading: !1,
        user: {
          id: payload.user._id,
          username: payload.user.username
        }
      };
    case LOGOUT:
      localStorage.removeItem('token');
      return {
        ...state,
        isSignedInWithGoogle: !1,
        loading: !1,
        token: null,
        isAuthenticated: !1
      };
   
    case LOADING:
      return { ...state, loading: !0 };
    case NOT_LOADING:
      return { ...state, loading: !1 };
    default:
      return state;
  }
}
