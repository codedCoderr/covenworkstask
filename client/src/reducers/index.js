import { combineReducers } from 'redux';
import auth from './auth';
import authError from './authError';
import alert from './alert';
import flightInfo from './flightInfo';
const rootReducer = combineReducers({
  auth,
  authError,
  alert,
  flightInfo
});
export default rootReducer;
