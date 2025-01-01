import { render, screen } from '@testing-library/react';

import { initActionsStore } from './mocks/actions-store';
import { Actions } from './emuns/actions.enum';
import { LoadingStatus } from './emuns/statuses.enum';
import { PlacementTypes } from './emuns/plecement-types.enum';
import { AppRoute } from './emuns/app-route.emun';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { App } from './App';

const { mockStoreCreator } = initActionsStore();

describe('App Routing', () => {
  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator({
      [Actions.user]: {
        authorizationStatus: false,
        userData: {
          id: 1,
          name: 'Nick Locks',
          avatarUrl: '/img/avatar.jpg',
          isPro: false,
          email: 'locks@example.com',
          token: 'testToken123',
        },
      },
      [Actions.city]: {
        city: {
          name: 'Paris',
          location: { latitude: 48.8566, longitude: 2.3522, zoom: 12 },
        },
      },
      [Actions.offers]: {
        offers: [],
        nearOffers: [],
        isOffersDataLoading: LoadingStatus.Success,
      },
      [Actions.offer]: {
        activeOffer: '1',
        offer: {
          id: 1,
          title: 'Test Offer',
          type: PlacementTypes.Apartment,
          price: 100,
          isFavorite: false,
          isPremium: true,
          rating: 4.5,
          city: { name: 'Paris', location: { latitude: 48.8566, longitude: 2.3522, zoom: 10 } },
          location: { latitude: 48.8566, longitude: 2.3522, zoom: 10 },
          description: 'description',
          bedrooms: 2,
          goods: ['window'],
          host: {
            name: 'Aba',
            avatarUrl: 'img/src1.jpg',
            isPro: false
          },
          previewImage: 'img/src1.jpg',
          images: ['img/src1.jpg'],
          maxAdults: 2
        },
        isOfferDataLoading: LoadingStatus.Success,
      },
      [Actions.comment]: {
        comments: [],
        isCommentsDataLoading: LoadingStatus.Success
      },
      [Actions.favorites]: {
        favorites: [],
        isFavoritesDataLoading: LoadingStatus.Success
      },
    });
  });

  it('should render Main page for "/" route', () => {
    render(
      <Provider store={store} >
        <MemoryRouter initialEntries={[AppRoute.Main]} >
          <App />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Cities/i)).toBeInTheDocument();
  });

  it('should render Login page for "/login" route', () => {
    render(
      <Provider store={store} >
        <MemoryRouter initialEntries={[AppRoute.Login]} >
          <App />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Password/i)).toBeInTheDocument();
  });

  it('should render Favorites page for "/favorites" route if authorized', () => {
    store = mockStoreCreator({
      [Actions.user]: {
        authorizationStatus: true,
        userData: {
          id: 1,
          name: 'Nick Locks',
          avatarUrl: '/img/avatar.jpg',
          isPro: false,
          email: 'locks@example.com',
          token: 'testToken123',
        },
      },
      [Actions.city]: {
        city: {
          name: 'Paris',
          location: { latitude: 48.8566, longitude: 2.3522, zoom: 12 },
        },
      },
      [Actions.offers]: {
        offers: [],
        nearOffers: [],
        isOffersDataLoading: LoadingStatus.Init,
      },
      [Actions.offer]: {
        activeOffer: '1',
        offer: {
          id: 1,
          title: 'Test Offer',
          type: PlacementTypes.Apartment,
          price: 100,
          isFavorite: false,
          isPremium: true,
          rating: 4.5,
          city: { name: 'Paris', location: { latitude: 48.8566, longitude: 2.3522, zoom: 10 } },
          location: { latitude: 48.8566, longitude: 2.3522, zoom: 10 },
          description: 'description',
          bedrooms: 2,
          goods: ['window'],
          host: {
            name: 'Aba',
            avatarUrl: 'img/src1.jpg',
            isPro: false
          },
          previewImage: 'img/src1.jpg',
          images: ['img/src1.jpg'],
          maxAdults: 2
        },
        isOfferDataLoading: LoadingStatus.Init,
      },
      [Actions.comment]: {
        comments: [],
        isCommentsDataLoading: LoadingStatus.Init
      },
      [Actions.favorites]: {
        favorites: [],
        isFavoritesDataLoading: LoadingStatus.Init
      },
    });

    render(
      <Provider store={store} >
        <MemoryRouter initialEntries={[AppRoute.Favorites]} >
          <App />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Saved listing/i)).toBeInTheDocument();
  });

  it('should render Offer page for "/offer/:id" route', () => {
    render(
      <Provider store={store} >
        <MemoryRouter initialEntries={[AppRoute.Offer.replace(':id', '1')]} >
          <App />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/What's inside/i)).toBeInTheDocument();
  });

  it('should render NotFound page for unknown route', () => {
    render(
      <Provider store={store} >
        <MemoryRouter initialEntries={['/unknown-route']} >
          <App />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/404 Not Found/i)).toBeInTheDocument();
  });
});
