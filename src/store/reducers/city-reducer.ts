import { createReducer } from '@reduxjs/toolkit';

import { ICity } from '../../interfaces/city.interface';

import { CITIES } from '../../constants/cities';
import { changeCity } from '../actions';

interface CityState {
  city: ICity;
}

const initialState: CityState = {
  city: CITIES.Paris,
};

const cityReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    });
});

export { cityReducer };
