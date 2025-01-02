import {
  mockCityInitState,
  mockCommentsInitState,
  mockFavoritesInitState,
  mockOfferInitState,
  mockOffersInitState,
  mockUserInitState
} from '../mocks/mock-store-data';
import { State } from '../store/state';

export const makeFakeStore = (initialState?: Partial<State>): State => ({
  User: mockUserInitState,
  City: mockCityInitState,
  Offers: mockOffersInitState,
  Offer: mockOfferInitState,
  Comments: mockCommentsInitState,
  Favorites: mockFavoritesInitState,
  ...initialState ?? {}
});
