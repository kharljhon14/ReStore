import { configureStore } from '@reduxjs/toolkit';
import baseApi from './services/base';
import rootReducer from './reducers';

// TODO make  reducer class

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
