import { createReducer } from '@reduxjs/toolkit';

import { CITIES } from '../constants/cities';
import { changeCity, getOffers, setAuthorizationStatus, setOffersLoadingStatus, setUserData } from './actions';
import { State } from './types';
import { NEAR_BY_OFFERS } from '../mocks/nearby-offers';

const initialState: State = {
  city: CITIES.Paris,
  offers: [],
  isOffersDataLoading: false,
  nearOffers: NEAR_BY_OFFERS,
  authorizationStatus: false,
  userData: null,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(getOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(setOffersLoadingStatus, (state, action) => {
      state.isOffersDataLoading = action.payload;
    })
    .addCase(setAuthorizationStatus, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setUserData, (state, action) => {
      state.userData = action.payload;
    });
});

export default reducer;
