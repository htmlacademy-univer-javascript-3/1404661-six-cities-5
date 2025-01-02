import { render, screen } from '@testing-library/react';
import { datatype } from 'faker';
import { MemoryHistory, createMemoryHistory } from 'history';

import { App } from './App.tsx';

import { AppRoute } from '../emuns/app-route.emun.ts';
import { LoadingStatus } from '../emuns/statuses.enum.ts';
import { PlacementTypes } from '../emuns/plecement-types.enum.ts';

import { makeFakeStore } from '../utils/mock-store.ts';
import { withHistory, withStore } from '../utils/mock-components.tsx';
import { mockUser } from '../mocks/mock-store-data.ts';


describe('App', () => {
  let mockHistory: MemoryHistory;

  beforeEach(() => {
    mockHistory = createMemoryHistory();
  });

  it('should render "Main" page when user navigate to "/"', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);

    const cityListTestId = 'city-list';
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore({}));
    mockHistory.push(AppRoute.Main);

    render(withStoreComponent);
    const cityList = screen.getByTestId(cityListTestId);

    expect(cityList).toBeInTheDocument();
    expect(screen.getByText(/places to stay/i)).toBeInTheDocument();
  });


  it('should render "Login" page when user navigate to "/login"', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore());
    mockHistory.push(AppRoute.Login);
    const loginFormTestId = 'login-form';
    const emailFormTestId = 'emailElement';
    const passwordFormTestId = 'passwordElement';


    render(withStoreComponent);
    const loginForm = screen.getByTestId(loginFormTestId);
    const emailForm = screen.getByTestId(emailFormTestId);
    const passwordForm = screen.getByTestId(passwordFormTestId);


    expect(loginForm).toBeInTheDocument();
    expect(emailForm).toBeInTheDocument();
    expect(passwordForm).toBeInTheDocument();
  });


  it('should render "Main" page when authorized user navigates to "/login"', () => {
    const cityListTestId = 'city-list';
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore(
      {
        User: {
          authorizationStatus: true,
          userData: mockUser
        }
      }
    ));
    mockHistory.push(AppRoute.Login);

    render(withStoreComponent);

    const cityList = screen.getByTestId(cityListTestId);

    expect(cityList).toBeInTheDocument();
    expect(screen.getByText(/places to stay/i)).toBeInTheDocument();
  });

  it('should render "Favorite" page when auth status is Auth', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore({
      User: {
        authorizationStatus: true,
        userData: mockUser
      },
    }));
    mockHistory.push(AppRoute.Favorites);

    const userInfoTestId = 'user-info';
    const favoritePageFooterTestId = 'favourite-page-footer';

    render(withStoreComponent);
    const userInfo = screen.getByTestId(userInfoTestId);
    const favouritePageFooter = screen.getByTestId(favoritePageFooterTestId);

    expect(userInfo).toBeInTheDocument();
    expect(favouritePageFooter).toBeInTheDocument();
  });

  it('should render "Login" page when auth status is NoAuth and route to Favourite Page', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore({
      User: {
        authorizationStatus: false,
        userData: mockUser
      },
    }));
    mockHistory.push(AppRoute.Favorites);
    const loginFormTestId = 'login-form';
    const emailFormTestId = 'emailElement';
    const passwordFormTestId = 'passwordElement';


    render(withStoreComponent);
    const loginForm = screen.getByTestId(loginFormTestId);
    const emailForm = screen.getByTestId(emailFormTestId);
    const passwordForm = screen.getByTestId(passwordFormTestId);


    expect(loginForm).toBeInTheDocument();
    expect(emailForm).toBeInTheDocument();
    expect(passwordForm).toBeInTheDocument();
  });

  it('should render "Offer" page when offer is in offerList', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const expectedOfferId = 2;

    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore({
      Offer: {
        offer: {
          id: expectedOfferId,
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
          maxAdults: datatype.number()
        },
        isOfferDataLoading: LoadingStatus.Success
      },
      User: {
        authorizationStatus: true,
        userData: mockUser
      },
    }));

    mockHistory.push(`/offer/${expectedOfferId}`);
    const userInfoTestId = 'user-info';
    const offerGalleryTestId = 'offer-gallery';
    const offerInfoTestId = 'offer-info';
    const hostInfoTestId = 'host-info';
    const reviewListTestId = 'reviews';
    const reviewFormTestId = 'review-form';
    const mapTestId = 'map';
    const nearbyTestId = 'nearby-places';

    render(withStoreComponent);
    const userInfo = screen.getByTestId(userInfoTestId);
    const offerInfo = screen.getByTestId(offerInfoTestId);
    const offerGallery = screen.getByTestId(offerGalleryTestId);
    const hostInfo = screen.getByTestId(hostInfoTestId);
    const reviewList = screen.getByTestId(reviewListTestId);
    const reviewForm = screen.getByTestId(reviewFormTestId);
    const map = screen.getByTestId(mapTestId);
    const nearby = screen.getByTestId(nearbyTestId);

    expect(userInfo).toBeInTheDocument();
    expect(offerInfo).toBeInTheDocument();
    expect(offerGallery).toBeInTheDocument();
    expect(reviewList).toBeInTheDocument();
    expect(hostInfo).toBeInTheDocument();
    expect(reviewForm).toBeInTheDocument();
    expect(map).toBeInTheDocument();
    expect(nearby).toBeInTheDocument();
  });
  it('should render "Error" page when route is incorrect', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore());
    const unknownRoute = 'unknownRoute';
    mockHistory.push(`/${unknownRoute}`);
    const expectedText = '404 Not Found';

    render(withStoreComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });

});
