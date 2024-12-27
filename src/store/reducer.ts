import { createReducer } from '@reduxjs/toolkit';

import { CITIES } from '../constants/cities';
import { changeCity, clearComments, clearNearbyOffers, clearOffer, clearUserData, getOffers, setAuthorizationStatus, setComments, setCommentsLoadingStatus, setNearbyOffers, setOffer, setOfferLoadingStatus, setOffersLoadingStatus, setUserData } from './actions';
import { State } from './types';
import { LoadingStatus } from '../emuns/statuses.enum';

const initialState: State = {
  city: CITIES.Paris,
  offers: [],
  isOffersDataLoading: LoadingStatus.Init,
  nearOffers: [],
  authorizationStatus: false,
  userData: null,
  comments: [],
  isOfferDataLoading: LoadingStatus.Init,
  isCommentsDataLoading: LoadingStatus.Init
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
    })
    .addCase(clearNearbyOffers, (state) => {
      state.nearOffers = [];
      state.isOffersDataLoading = LoadingStatus.Init;
    })
    .addCase(setNearbyOffers, (state, action) => {
      state.nearOffers = action.payload;
    })
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
    .addCase(clearUserData, (state) => {
      state.userData = null;
    })
    .addCase(setComments, (state, action) => {
      state.comments = action.payload;
    })
    .addCase(clearComments, (state) => {
      state.comments = [];
      state.isOffersDataLoading = LoadingStatus.Init;
    })
    .addCase(setCommentsLoadingStatus, (state, action) => {
      state.isCommentsDataLoading = action.payload;
    });

});

export default reducer;
