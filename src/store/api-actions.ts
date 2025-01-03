import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { StatusCodes } from 'http-status-codes';

import { IOffer } from '../interfaces/offer.interface.ts';
import { IUserFull } from '../interfaces/user.inretface.ts';
import { ILogin } from '../interfaces/login.interface.ts';
import { IOfferFull } from '../interfaces/offer-full.interface.ts';
import { IComment } from '../interfaces/comment.interface.ts';
import { IForm } from '../interfaces/form.interface.ts';
import { LoadingStatus } from '../emuns/loading-statuses.enum.ts';
import { Actions } from '../emuns/actions.enum.ts';

import {
  clearUserData,
  getOffers,
  setAuthorizationStatus,
  setComments,
  setCommentsLoadingStatus,
  setFavorites,
  setFavoritesLoadingStatus,
  setNearbyOffers,
  setOffer,
  setOfferLoadingStatus,
  setOffersLoadingStatus,
  setUserData
} from './actions.ts';
import { API_ROUTES } from '../constants/api-routes.ts';
import { AppDispatch, State } from './state.ts';
import { dropToken, saveToken } from '../api/axios-api.ts';

type DispatchStateExtra = {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
};

export const fetchOffers = createAsyncThunk<void, undefined, DispatchStateExtra>(
  `${Actions.offers}/fetch`,
  async (_arg, { dispatch, extra: api }) => {
    dispatch(setOffersLoadingStatus(LoadingStatus.Pending));
    const { status, data } = await api.get<IOffer[]>(API_ROUTES.OFFERS.ALL);
    if (status === Number(StatusCodes.NOT_FOUND)) {
      dispatch(setOffersLoadingStatus(LoadingStatus.Failure));
      return;
    }
    dispatch(getOffers(data));
    dispatch(setOffersLoadingStatus(LoadingStatus.Success));
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
    dispatch(clearUserData());
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
      dispatch(clearUserData());
    }
  },
);

export const fetchOffer = createAsyncThunk<void, string, DispatchStateExtra>(
  `${Actions.offer}/fetch`,
  async (id, { dispatch, extra: api }) => {
    dispatch(setOfferLoadingStatus(LoadingStatus.Pending));

    const { status, data } = await api.get<IOfferFull>(API_ROUTES.OFFERS.EXACT(id));

    if (status === Number(StatusCodes.NOT_FOUND)) {
      dispatch(setOfferLoadingStatus(LoadingStatus.Failure));
      return;
    }

    dispatch(setOffer(data));
    dispatch(setOfferLoadingStatus(LoadingStatus.Success));
  },
);

export const fetchOffersNearby = createAsyncThunk<void, string, DispatchStateExtra>(
  `${Actions.offers}/nearby`,
  async (id, { dispatch, extra: api }) => {
    dispatch(setOffersLoadingStatus(LoadingStatus.Pending));
    const { data: nearbyOffers } = await api.get<IOffer[]>(API_ROUTES.OFFERS.NEARBY(id));
    dispatch(setNearbyOffers(nearbyOffers));
    dispatch(setOffersLoadingStatus(LoadingStatus.Success));
  },
);

export const fetchComments = createAsyncThunk<void, string, DispatchStateExtra>(
  `${Actions.comment}/fetch`,
  async (id, { dispatch, extra: api }) => {
    dispatch(setCommentsLoadingStatus(LoadingStatus.Pending));
    const { data: comments } = await api.get<IComment[]>(API_ROUTES.COMMENTS.GET(id));
    dispatch(setComments(comments));
    dispatch(setCommentsLoadingStatus(LoadingStatus.Success));
  },
);


export const createComment = createAsyncThunk<void, { form: IForm } & { offerId: string }, DispatchStateExtra>(
  `${Actions.comment}/create`,
  async ({ offerId, form }, { dispatch, getState, extra: api }) => {
    const { status } = await api.post<IForm>(API_ROUTES.COMMENTS.POST(offerId), form);

    const state = getState();

    if (status === Number(StatusCodes.CREATED) && state[Actions.offer].offer && state[Actions.offer].offer?.id === Number(offerId)) {
      dispatch(fetchComments(offerId));
    }
  },
);

export const fetchFavorites = createAsyncThunk<void, undefined, DispatchStateExtra>(
  `${Actions.favorites}/fetch`,
  async (_arg, { dispatch, extra: api }) => {
    dispatch(setFavoritesLoadingStatus(LoadingStatus.Pending));
    const { status, data } = await api.get<IOffer[]>(API_ROUTES.FAVORITE.GET);
    if (status === Number(StatusCodes.NOT_FOUND)) {
      dispatch(setFavoritesLoadingStatus(LoadingStatus.Failure));
      return;
    }

    dispatch(setFavorites(data));
    dispatch(setFavoritesLoadingStatus(LoadingStatus.Success));
  },
);

export const changeFavorite = createAsyncThunk<void, { offerId: string; favoriteStatus: boolean; offerPageId?: string }, DispatchStateExtra>(
  `${Actions.favorites}/change`,
  async ({ offerId, favoriteStatus, offerPageId }, { dispatch, extra: api }) => {
    const { status } = await api.post<IForm>(API_ROUTES.FAVORITE.SET_STATUS(offerId, favoriteStatus ? 1 : 0));

    if ((status === Number(StatusCodes.CREATED) || status === Number(StatusCodes.OK))) {
      dispatch(fetchFavorites());
      dispatch(fetchOffers());
      if (offerPageId) {
        dispatch(fetchOffersNearby(offerPageId));
      }
    }
  },
);
