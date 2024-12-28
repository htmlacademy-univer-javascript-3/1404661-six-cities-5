import { createReducer } from '@reduxjs/toolkit';

import { IOffer } from '../../interfaces/offer.interface';
import { LoadingStatus } from '../../emuns/statuses.enum';

import { clearNearbyOffers, getOffers, setNearbyOffers, setOffersLoadingStatus } from '../actions';


interface OffersState {
  offers: IOffer[];
  nearOffers: IOffer[];
  isOffersDataLoading: LoadingStatus;
}

const initialState: OffersState = {
  offers: [],
  nearOffers: [],
  isOffersDataLoading: LoadingStatus.Init,
};

const offersReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(getOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(setNearbyOffers, (state, action) => {
      state.nearOffers = action.payload;
    })
    .addCase(clearNearbyOffers, (state) => {
      state.nearOffers = [];
      state.isOffersDataLoading = LoadingStatus.Success;
    })
    .addCase(setOffersLoadingStatus, (state, action) => {
      state.isOffersDataLoading = action.payload;
    });
});

export { offersReducer };
