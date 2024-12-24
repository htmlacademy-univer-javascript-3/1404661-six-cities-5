import { IOffer } from '../interfaces/components/offer.interface';
import { ICity } from '../interfaces/city.interface';

export type State = {
  city: ICity;
  offers: IOffer[];
  isOffersDataLoading: boolean;
  nearOffers: IOffer[];
};

