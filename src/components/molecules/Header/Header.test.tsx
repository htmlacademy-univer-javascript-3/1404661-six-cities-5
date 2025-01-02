import { render, screen } from '@testing-library/react';

import { Header } from './header';

import { LoadingStatus } from '../../../emuns/loading-statuses.enum';

import { withHistory, withStore } from '../../../utils/mock-components';
import { makeFakeStore } from '../../../utils/mock-store';
import { mockUser } from '../../../mocks/mock-store-data';

describe('Header', () => {
  it('should render Header correctly when user signed in', () => {
    const expectedTestId = 'user-info';
    const expectedAuthItemTestId = 'item-for-auth';
    const expectedText = /Sign out/i;

    const { withStoreComponent } = withStore(<Header isAuthorized />, makeFakeStore({
      User: {
        authorizationStatus: true,
        userData: mockUser
      },
      Favorites: {
        favorites: [],
        isFavoritesDataLoading: LoadingStatus.Success
      }
    }));
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);
    const testId = screen.getByTestId(expectedTestId);
    const authItem = screen.getByTestId(expectedAuthItemTestId);

    expect(testId).toBeInTheDocument();
    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(authItem).toBeInTheDocument();
  });

  it('should render Header correctly when user signed out', () => {
    const expectedTestId = 'user-info';
    const expectedText = /Sign in/i;

    const { withStoreComponent } = withStore(<Header isAuthorized={false} />, {
      User: {
        authorizationStatus: false,
        userData: null
      },
      Favorites: {
        favorites: [],
        isFavoritesDataLoading: LoadingStatus.Failure
      }
    });
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);
    const testId = screen.getByTestId(expectedTestId);

    expect(testId).toBeInTheDocument();
    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
