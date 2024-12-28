import { configureStore } from '@reduxjs/toolkit';
import { reducer } from './reducer';
import { createAPI } from '../api/axios-api';

export const api = createAPI();

export const store = configureStore({
  reducer: reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }),
});
