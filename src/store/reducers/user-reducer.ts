import { createReducer } from '@reduxjs/toolkit';

import { IUserFull } from '../../interfaces/user.inretface';

import { clearUserData, setAuthorizationStatus, setUserData } from '../actions';

interface UserState {
  authorizationStatus: boolean;
  userData: IUserFull | null;
};

const initialState: UserState = {
  authorizationStatus: false,
  userData: null,
};

const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setAuthorizationStatus, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setUserData, (state, action) => {
      state.userData = action.payload;
    })
    .addCase(clearUserData, (state) => {
      state.userData = null;
    });
});

export { userReducer };