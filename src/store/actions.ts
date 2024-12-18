import { createAction } from '@reduxjs/toolkit';

import { IOffer } from '../interfaces/components/offer.interface';
import { ICity } from '../interfaces/city.interface';

export const setCity = createAction<{ city: ICity }>('SET_CITY');

export const setOffers = createAction<{ offers: IOffer[] }>('SET_OFFERS');

export const setNearOffers = createAction<{ nearOffers: IOffer[] }>('SET_NEAR_OFFERS');
