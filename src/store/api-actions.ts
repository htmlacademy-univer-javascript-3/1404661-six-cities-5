import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getOffers, setOffersLoadingStatus } from './actions.ts';
import { Actions } from '../emuns/actions.enum.ts';
import { API_ROUTES } from '../constants/api-routes.ts';
import { IOffer } from '../interfaces/components/offer.interface.ts';
import { AppDispatch } from './state.ts';
import { State } from 'history';

export const fetchOffers = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  `${Actions.offers}/fetch`,
  async (_arg, { dispatch, extra: api }) => {
    dispatch(setOffersLoadingStatus(true));
    const { data } = await api.get<IOffer[]>(API_ROUTES.OFFERS.ALL);
    dispatch(getOffers(data));
    dispatch(setOffersLoadingStatus(false));
  },
);
