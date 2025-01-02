import { render, screen } from '@testing-library/react';
import { datatype } from 'faker';

import { FavoritesList } from './FavoritesList';

import { withHistory, withStore } from '../../../utils/mock-components';
import { mockOffer } from '../../../mocks/mock-store-data';

describe('FavouriteList', () => {
  it('should render FavouriteList correctly', () => {
    const expectedTestId = 'favourite-list';
    const cityList = [datatype.string(), datatype.string()];
    const { withStoreComponent } = withStore(<FavoritesList favoritesOffers={[mockOffer]} cities={cityList} />);
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);
    const testId = screen.getByTestId(expectedTestId);

    expect(testId).toBeInTheDocument();
  });
});
