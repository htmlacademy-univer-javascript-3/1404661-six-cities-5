import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as ReactRouterDom from 'react-router-dom';
import { datatype } from 'faker';
import { vi } from 'vitest';

import { Offer } from './offer';

import { IOfferFull } from '../../interfaces/offer-full.interface';
import { PlacementTypes } from '../../emuns/plecement-types.enum';
import { LoadingStatus } from '../../emuns/loading-statuses.enum';

import { withHistory, withStore } from '../../utils/mock-components';
import { makeFakeStore } from '../../utils/mock-store';
import { mockUser } from '../../mocks/mock-store-data';

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof ReactRouterDom>('react-router-dom');
  return {
    ...actual,
    useParams: () => ({ id: '1' }),
  };
});

const mockHandleChange = vi.fn();

describe('Offer', () => {
  it('should render "Offer" page correctly', () => {
    const mockOfferListOfferPage: IOfferFull[] = [
      {
        id: 1,
        title: datatype.string(),
        type: PlacementTypes.Apartment,
        price: datatype.number(),
        city: {
          name: 'Paris',
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
        previewImage: datatype.string(),
        description: '',
        bedrooms: 0,
        goods: [],
        host: {
          avatarUrl: datatype.string(),
          name: datatype.string(),
          isPro: datatype.boolean(),
        },
        images: [],
        maxAdults: 0
      }
    ];
    const mockOfferOfferPage: IOfferFull = {
      id: 1,
      title: datatype.string(),
      type: PlacementTypes.Apartment,
      price: datatype.number(),
      city: {
        name: 'Paris',
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
      images: [datatype.string()],
      maxAdults: datatype.number(),
      previewImage: datatype.string()
    };

    const { withStoreComponent } = withStore(
      <Offer isAuthorized onFavouriteClick={mockHandleChange} />,
      makeFakeStore({
        Offer: {
          offer: mockOfferOfferPage,
          isOfferDataLoading: LoadingStatus.Success
        },
        Offers: {
          offers: [],
          nearOffers: mockOfferListOfferPage,
          isOffersDataLoading: LoadingStatus.Success,
        },
        User: {
          authorizationStatus: true,
          userData: mockUser
        },
      })
    );

    const withHistoryComponent = withHistory(withStoreComponent);

    render(withHistoryComponent);

    expect(screen.getByTestId('user-info')).toBeInTheDocument();
    expect(screen.getByTestId('offer-gallery')).toBeInTheDocument();
    expect(screen.getByTestId('offer-info')).toBeInTheDocument();
    expect(screen.getByTestId('host-info')).toBeInTheDocument();
    expect(screen.getByTestId('reviews')).toBeInTheDocument();
    expect(screen.getByTestId('review-form')).toBeInTheDocument();
    expect(screen.getByTestId('map')).toBeInTheDocument();
    expect(screen.getByTestId('nearby-places')).toBeInTheDocument();

  });

  it('should render "Offer" page and dispatch event when press the button', async () => {
    const mockOfferListOfferPage: IOfferFull[] = [
      {
        id: 1,
        title: datatype.string(),
        type: PlacementTypes.Apartment,
        price: datatype.number(),
        city: {
          name: 'Paris',
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
        previewImage: datatype.string(),
        description: '',
        bedrooms: 0,
        goods: [],
        host: {
          avatarUrl: datatype.string(),
          name: datatype.string(),
          isPro: datatype.boolean(),
        },
        images: [],
        maxAdults: 0
      }
    ];
    const mockOfferOfferPage: IOfferFull = {
      id: 1,
      title: datatype.string(),
      type: PlacementTypes.Apartment,
      price: datatype.number(),
      city: {
        name: 'Paris',
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
      images: [datatype.string()],
      maxAdults: datatype.number(),
      previewImage: datatype.string()
    };

    const { withStoreComponent } = withStore(
      <Offer isAuthorized onFavouriteClick={mockHandleChange} />,
      makeFakeStore({
        Offer: {
          offer: mockOfferOfferPage,
          isOfferDataLoading: LoadingStatus.Success
        },
        Offers: {
          offers: [],
          nearOffers: mockOfferListOfferPage,
          isOffersDataLoading: LoadingStatus.Success,
        },
        User: {
          userData: mockUser,
          authorizationStatus: true,
        },
      })
    );

    const withHistoryComponent = withHistory(withStoreComponent);

    render(withHistoryComponent);

    const button = screen.getByTestId('favourite-button');
    await userEvent.click(button);
    expect(button).not.toBeDisabled();
    expect(mockHandleChange).toHaveBeenCalled();
  });

});
