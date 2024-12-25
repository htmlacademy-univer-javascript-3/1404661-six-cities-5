import { createAction } from '@reduxjs/toolkit';

import { IOffer } from '../interfaces/components/offer.interface';
import { ICity } from '../interfaces/city.interface';
import { Actions } from '../emuns/actions.enum';
import { IUserFull } from '../interfaces/user.inretface';


export const changeCity = createAction<ICity>(`${Actions.city}/change`);

export const getOffers = createAction<IOffer[]>(`${Actions.offers}/fill`);

export const setOffersLoadingStatus = createAction<boolean>(`${Actions.offers}/loading`);

export const setAuthorizationStatus = createAction<boolean>(`${Actions.user}/authorization`);

export const setUserData = createAction<IUserFull | null>(`${Actions.user}/setData`);
