import { createReducer } from '@reduxjs/toolkit';

import { setCity, setNearOffers, setOffers } from './actions';
import { State } from './types';
import { CITIES } from '../constants/cities';
import { OFFERS } from '../mocks/offers';
import { NEAR_BY_OFFERS } from '../mocks/nearby-offers';

const initialState: State = {
  city: CITIES.Paris,
  offers: OFFERS.filter((offer) => offer.city.title === CITIES.Paris.title),
  nearOffers: NEAR_BY_OFFERS
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setCity, (state, action) => {
      const { city } = action.payload;
      state.city = city;
    })
    .addCase(setOffers, (state, action) => {
      const { offers } = action.payload;

      state.offers = offers;
    })
    .addCase(setNearOffers, (state, action) => {
      const { nearOffers } = action.payload;

      state.nearOffers = nearOffers;
    });
});

export default reducer;
