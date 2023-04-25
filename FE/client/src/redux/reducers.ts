import { combineReducers } from '@reduxjs/toolkit';
import baseApi from './services/base';
import productFilter from './slices/productFilter';
import auth from './slices/auth';

const mainReducer = combineReducers({
  productFilter,
  auth,
});

const apiReducers = {
  [baseApi.reducerPath]: baseApi.reducer,
};

const rootReducer = combineReducers({
  main: mainReducer,
  ...apiReducers,
});

export default rootReducer;
