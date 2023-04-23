import { combineReducers } from '@reduxjs/toolkit';
import baseApi from './services/base';
import productFilter from './slices/productFilter';

const mainReducer = combineReducers({
  productFilter,
});

const apiReducers = {
  [baseApi.reducerPath]: baseApi.reducer,
};

const rootReducer = combineReducers({
  main: mainReducer,
  ...apiReducers,
});

export default rootReducer;
