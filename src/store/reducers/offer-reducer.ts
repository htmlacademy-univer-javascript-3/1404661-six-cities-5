import { createReducer } from '@reduxjs/toolkit';

import { IOfferFull } from '../../interfaces/offer-full.interface';
import { LoadingStatus } from '../../emuns/statuses.enum';

import { clearOffer, setOffer, setOfferLoadingStatus } from '../actions';

interface OfferState {
  offer?: IOfferFull;
  isOfferDataLoading: LoadingStatus;
  activeOffer?: string;
};

const initialState: OfferState = {
  offer: undefined,
  isOfferDataLoading: LoadingStatus.Init
};

const offerReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setOffer, (state, action) => {
      state.offer = action.payload;
    })
    .addCase(clearOffer, (state) => {
      state.offer = undefined;
      state.isOfferDataLoading = LoadingStatus.Init;
    })
    .addCase(setOfferLoadingStatus, (state, action) => {
      state.isOfferDataLoading = action.payload;
    })
});

export { offerReducer };