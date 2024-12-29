import { createReducer } from '@reduxjs/toolkit';

import { IOffer } from '../../interfaces/offer.interface';
import { LoadingStatus } from '../../emuns/statuses.enum';

import { setFavorites, setFavoritesLoadingStatus } from '../actions';


type FavoritesState = {
  favorites: IOffer[];
  isFavoritesDataLoading: LoadingStatus;
};

const initialState: FavoritesState = {
  favorites: [],
  isFavoritesDataLoading: LoadingStatus.Init,
};

const favoritesReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setFavorites, (state, action) => {
      state.favorites = action.payload;
    })
    .addCase(setFavoritesLoadingStatus, (state, action) => {
      state.isFavoritesDataLoading = action.payload;
    });
});

export { favoritesReducer };
