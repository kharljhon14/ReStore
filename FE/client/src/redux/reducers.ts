import { combineReducers } from '@reduxjs/toolkit';
import baseApi from './services/base';
import store from '.';

const mainReducer = combineReducers({});

const apiReducers = {
  [baseApi.reducerPath]: baseApi.reducer,
};

const rootReducer = combineReducers({
  main: mainReducer,
  ...apiReducers,
});

export default rootReducer;
