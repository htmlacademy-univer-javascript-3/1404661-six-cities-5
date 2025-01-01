import { IOffer } from '../../interfaces/offer.interface';
import { PlacementTypes } from '../../emuns/plecement-types.enum';
import { LoadingStatus } from '../../emuns/statuses.enum';

import { clearNearbyOffers, getOffers, setNearbyOffers, setOffersLoadingStatus } from '../actions';
import { offersReducer } from '../reducers/offers-reducer';


describe('offersReducer', () => {
  const initialState = {
    offers: [],
    nearOffers: [],
    isOffersDataLoading: LoadingStatus.Init,
  };

  const mockOffers: IOffer[] = [
    {
      id: 1,
      title: 'Test Offer',
      type: PlacementTypes.Apartment,
      price: 100,
      previewImage: '/img/test1.jpg',
      city: {
        name: 'Paris',
        location: { latitude: 48.8566, longitude: 2.3522, zoom: 12 },
      },
      location: { latitude: 48.8566, longitude: 2.3522, zoom: 10 },
      isFavorite: false,
      isPremium: true,
      rating: 4.5,
    },
    {
      id: 2,
      title: 'Test Offer - 2',
      type: PlacementTypes.Apartment,
      price: 100,
      previewImage: '/img/test2.jpg',
      city: {
        name: 'Paris',
        location: { latitude: 48.8566, longitude: 2.3522, zoom: 12 },
      },
      location: { latitude: 48.8566, longitude: 2.3522, zoom: 10 },
      isFavorite: false,
      isPremium: true,
      rating: 4.5,
    }
  ];

  it('should return the initial state by default', () => {
    expect(offersReducer(undefined, { type: undefined })).toEqual(initialState);
  });

  it('should handle getOffers action', () => {
    expect(offersReducer(initialState, getOffers(mockOffers))).toEqual({
      ...initialState,
      offers: mockOffers,
    });
  });

  it('should handle setNearbyOffers action', () => {
    expect(offersReducer(initialState, setNearbyOffers(mockOffers))).toEqual({
      ...initialState,
      nearOffers: mockOffers,
    });
  });

  it('should handle clearNearbyOffers action', () => {
    const stateWithNearOffers = {
      ...initialState,
      nearOffers: mockOffers,
      isOffersDataLoading: LoadingStatus.Pending,
    };

    expect(offersReducer(stateWithNearOffers, clearNearbyOffers())).toEqual({
      ...initialState,
      nearOffers: [],
      isOffersDataLoading: LoadingStatus.Success,
    });
  });

  it('should handle setOffersLoadingStatus action', () => {
    expect(
      offersReducer(initialState, setOffersLoadingStatus(LoadingStatus.Pending))
    ).toEqual({
      ...initialState,
      isOffersDataLoading: LoadingStatus.Pending,
    });
  });
});
