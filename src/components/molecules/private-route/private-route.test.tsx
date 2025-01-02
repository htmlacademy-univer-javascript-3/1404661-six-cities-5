import { render, screen } from '@testing-library/react';
import { Route, Routes } from 'react-router-dom';
import { createMemoryHistory, MemoryHistory } from 'history';

import { PrivateRoute } from './private-route';

import { AppRoute } from '../../../emuns/app-route.emun';

import { withHistory } from '../../../utils/mock-components';

describe('PrivateRoute', () => {
  let mockHistory: MemoryHistory;

  beforeAll(() => {
    mockHistory = createMemoryHistory();
  });

  beforeEach(() => {
    mockHistory.push(AppRoute.Favorites);
  });

  it('should redirect to login page, when user is not authorized', () => {
    const expectedText = 'public route';
    const notExpectedText = 'private route';

    const preparedComponent = withHistory(
      <Routes>
        <Route path={AppRoute.Login} element={<span>{expectedText}</span>} />
        <Route path={AppRoute.Favorites} element={
          <PrivateRoute isAuthorized={false}>
            <span>{notExpectedText}</span>
          </PrivateRoute>
        }
        />
      </Routes>,
      mockHistory
    );

    render(preparedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.queryByText(notExpectedText)).not.toBeInTheDocument();
  });

  it('should render children, when user is authorized', () => {
    const expectedText = 'private route';
    const notExpectedText = 'public route';

    const preparedComponent = withHistory(
      <Routes>
        <Route path={AppRoute.Login} element={<span>{notExpectedText}</span>} />
        <Route path={AppRoute.Favorites} element={
          <PrivateRoute isAuthorized>
            <span>{expectedText}</span>
          </PrivateRoute>
        }
        />
      </Routes>,
      mockHistory
    );

    render(preparedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.queryByText(notExpectedText)).not.toBeInTheDocument();
  });
});
