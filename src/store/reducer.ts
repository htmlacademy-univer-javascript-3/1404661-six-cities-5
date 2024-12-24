import { createReducer } from '@reduxjs/toolkit';

import { CITIES } from '../constants/cities';
import { changeCity, getOffers, setOffersLoadingStatus } from './actions';
import { State } from './types';
import { NEAR_BY_OFFERS } from '../mocks/nearby-offers';

const initialState: State = {
  city: CITIES.Paris,
  offers: [],
  isOffersDataLoading: false,
  nearOffers: NEAR_BY_OFFERS
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
    });
});

export default reducer;
