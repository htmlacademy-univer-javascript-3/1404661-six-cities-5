import { datatype, internet } from 'faker';

import { LoadingStatus } from '../emuns/loading-statuses.enum';
import { PlacementTypes } from '../emuns/plecement-types.enum';

import { CITIES } from '../constants/cities';

/** Моковое предложение. */
export const mockOffer = {
  id: datatype.number(),
  title: datatype.string(),
  type: PlacementTypes.Apartment,
  price: datatype.number(),
  city: {
    name: datatype.string(),
    location: {
      latitude: datatype.number(),
      longitude: datatype.number(),
      zoom: datatype.number(),
    }
  },
  location: {
    latitude: datatype.number(),
    longitude: datatype.number(),
    zoom: datatype.number(),
  },
  isFavorite: datatype.boolean(),
  isPremium: datatype.boolean(),
  rating: datatype.number(),
  description: datatype.string(),
  bedrooms: datatype.number(),
  goods: [datatype.string()],
  host: {
    name: datatype.string(),
    avatarUrl: datatype.string(),
    isPro: datatype.boolean(),
  },
  previewImage: datatype.string(),
  images: [datatype.string()],
  maxAdults: datatype.number(),
};

/** Моковый пользователь. */
export const mockUser = {
  id: datatype.number(),
  email: internet.email(),
  token: datatype.string(),
  avatarUrl: datatype.string(),
  name: datatype.string(),
  isPro: datatype.boolean(),
};

/** Моковый стейт пользователя. */
export const mockUserInitState = {
  authorizationStatus: false,
  userData: null,
};

/** Моковый стейт городов. */
export const mockCityInitState = { city: CITIES.Paris };

/** Моковый стейт предложений. */
export const mockOffersInitState = {
  offers: [],
  nearOffers: [],
  isOffersDataLoading: LoadingStatus.Init,
};

/** Моковый стейт предложения. */
export const mockOfferInitState = {
  offer: mockOffer,
  isOfferDataLoading: LoadingStatus.Init
};

/** Моковый стейт комментариев. */
export const mockCommentsInitState = {
  comments: [],
  isCommentsDataLoading: LoadingStatus.Init
};

/** Моковый стейт избранных предлодений. */
export const mockFavoritesInitState = {
  favorites: [],
  isFavoritesDataLoading: LoadingStatus.Init
};
