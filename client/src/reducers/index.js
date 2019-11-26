import { combineReducers } from 'redux';
import auth from './auth';
import authError from './authError';
import alert from './alert';
const rootReducer = combineReducers({
  auth,
  authError,
  alert
});
export default rootReducer;
