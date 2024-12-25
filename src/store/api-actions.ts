import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getOffers, setAuthorizationStatus, setOffersLoadingStatus, setUserData } from './actions.ts';
import { Actions } from '../emuns/actions.enum.ts';
import { API_ROUTES } from '../constants/api-routes.ts';
import { IOffer } from '../interfaces/components/offer.interface.ts';
import { AppDispatch } from './state.ts';
import { State } from 'history';
import { dropToken, saveToken } from '../api/axios-api.ts';
import { IUserFull } from '../interfaces/user.inretface.ts';
import { StatusCodes } from 'http-status-codes';
import { ILogin } from '../interfaces/login.interface.ts';


type DispatchStateExtra = {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
};

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

export const userLogin = createAsyncThunk<void, ILogin, DispatchStateExtra>(
  `${Actions.user}/login`,
  async ({ email, password }, { dispatch, extra: api }) => {
    const { status, data } = await api.post<IUserFull>(API_ROUTES.USER.LOGIN, {
      email,
      password,
    });

    if (status === Number(StatusCodes.CREATED)) {
      dispatch(setAuthorizationStatus(true));
      dispatch(setUserData(data));
      saveToken(data.token);
    } else {
      dispatch(setAuthorizationStatus(false));
    }
  }
);

export const userLogout = createAsyncThunk<void, undefined, DispatchStateExtra>(
  `${Actions.user}/logout`,
  async (_arg, { dispatch, extra: api }) => {
    await api.delete(API_ROUTES.USER.LOGOUT);
    dispatch(setAuthorizationStatus(false));
    dispatch(setUserData(null));
    dropToken();
  },
);

export const userCheckAuth = createAsyncThunk<void, undefined, DispatchStateExtra>(
  `${Actions.user}/login`,
  async (_arg, { dispatch, extra: api }) => {
    try {
      const { data } = await api.get<IUserFull>(API_ROUTES.USER.VALIDATE);
      dispatch(setAuthorizationStatus(true));
      dispatch(setUserData(data));
      saveToken(data.token);
    } catch {
      dispatch(setAuthorizationStatus(false));
      dispatch(setUserData(null));
    }
  },
);
