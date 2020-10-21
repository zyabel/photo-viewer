import { combineReducers } from 'redux';
import app from './app';
import photos from './photos';
import auth from './auth';

const rootReducer = combineReducers({
  app,
  auth,
  photos
});

export default rootReducer;