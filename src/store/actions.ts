import { createAction } from '@reduxjs/toolkit';

import { IOffer } from '../interfaces/offer.interface';
import { ICity } from '../interfaces/city.interface';
import { IUserFull } from '../interfaces/user.inretface';
import { IOfferFull } from '../interfaces/offer-full.interface';
import { IComment } from '../interfaces/comment.interface';
import { Actions } from '../emuns/actions.enum';
import { LoadingStatus } from '../emuns/statuses.enum';

/** Изменение города. */
export const changeCity = createAction<ICity>(`${Actions.city}/change`);

/** Получение предложений. */
export const getOffers = createAction<IOffer[]>(`${Actions.offers}/fill`);

/** Установка статуса загрузки предложений. */
export const setOffersLoadingStatus = createAction<LoadingStatus>(`${Actions.offers}/loading`);

/** Установка статуса авторизации. */
export const setAuthorizationStatus = createAction<boolean>(`${Actions.user}/authorization`);

/** Загрузка данных пользователя. */
export const setUserData = createAction<IUserFull | null>(`${Actions.user}/setData`);

/** Очистка данных пользователя. */
export const clearUserData = createAction(`${Actions.user}/clear`);

/** Загрузка ближайших предложений. */
export const setNearbyOffers = createAction<IOffer[]>(`${Actions.offers}/nearby`);

/** Очистка ближайших предложений. */
export const clearNearbyOffers = createAction(`${Actions.offers}/clearNearby`);

/** Загрузка предложения. */
export const setOffer = createAction<IOfferFull>(`${Actions.offer}/set`);

/** Очистка предложения. */
export const clearOffer = createAction(`${Actions.offer}/clear`);

/** Установка статуса загрузки предложения. */
export const setOfferLoadingStatus = createAction<LoadingStatus>(`${Actions.offer}/loading`);

/** Загрузка комментариев. */
export const setComments = createAction<IComment[]>(`${Actions.comment}/set`);

/** Очистка комментариев. */
export const clearComments = createAction(`${Actions.comment}/clear`);

/** Установка статуса загрузки комментариев. */
export const setCommentsLoadingStatus = createAction<LoadingStatus>(`${Actions.comment}/loading`);
