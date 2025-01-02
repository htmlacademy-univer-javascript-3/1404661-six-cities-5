import { render, screen } from '@testing-library/react';

import { Favorites } from './Favorites';

import { LoadingStatus } from '../../emuns/statuses.enum';

import { makeFakeStore } from '../../utils/mock-store';
import { withHistory, withStore } from '../../utils/mock-components';
import { mockOffer } from '../../mocks/mock-store-data';


describe('Component: FavouritePage', () => {
  it('should render correctly whet status is auth', () => {
    const expectedTestId = 'saved-list';
    const expectedFooterTestId = 'favourite-page-footer';
    const expectedUserSingOutText = 'Sign out';

    const { withStoreComponent } = withStore(<Favorites isAuthorized />, makeFakeStore({
      Favorites: {
        favorites: [mockOffer],
        isFavoritesDataLoading: LoadingStatus.Success
      }
    }
    ));
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);
    const testId = screen.getByTestId(expectedTestId);
    const footerTestId = screen.getByTestId(expectedFooterTestId);

    expect(testId).toBeInTheDocument();
    expect(footerTestId).toBeInTheDocument();
    expect(screen.getByText(expectedUserSingOutText)).toBeInTheDocument();
  });

  it('should render correctly when favorite list is empty', () => {
    const expectedText = 'Save properties to narrow down search or plan your future trips.';

    const { withStoreComponent } = withStore(<Favorites isAuthorized />, makeFakeStore({
      Favorites: {
        favorites: [],
        isFavoritesDataLoading: LoadingStatus.Success
      }
    }));
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
