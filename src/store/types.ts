import { store } from './';

import { IOffer } from '../interfaces/components/offer.interface';
import { ICity } from '../interfaces/city.interface';

export type State = {
  city: ICity;
  offers: IOffer[];
  nearOffers: IOffer[];
};

export type AppDispatch = typeof store.dispatch
