import { render, screen } from '@testing-library/react';
import { datatype } from 'faker';

import { Main } from './Main';

import { IOfferFull } from '../../interfaces/offer-full.interface';
import { LoadingStatus } from '../../emuns/statuses.enum';
import { PlacementTypes } from '../../emuns/plecement-types.enum';

import { withHistory, withStore } from '../../utils/mock-components';
import { makeFakeStore } from '../../utils/mock-store';

describe('Main', () => {
  it('should render "Main" page correctly', () => {
    const expectedCityListId = 'city-list';
    const formTestId = 'filter-form';

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

    const { withStoreComponent } = withStore(<Main isAuthorized />, makeFakeStore({
      Offers: {
        offers: mockOfferListOfferPage,
        nearOffers: [],
        isOffersDataLoading: LoadingStatus.Success,
      }

    }));
    const preparedComponent = withHistory(withStoreComponent);
    const expectedText = /places to stay in/i;

    render(preparedComponent);

    const testId = screen.getByTestId(expectedCityListId);
    const text = screen.getByText(expectedText);
    const form = screen.getByTestId(formTestId);

    expect(testId).toBeInTheDocument();
    expect(form).toBeInTheDocument();
    expect(text).toBeInTheDocument();
  });
});
