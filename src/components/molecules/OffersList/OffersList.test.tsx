import { MouseEventHandler } from 'react';
import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';

import { OffersList } from './OffersList';

import { IOffer } from '../../../interfaces/offer.interface';
import { PlacementTypes } from '../../../emuns/plecement-types.enum';
import { initActionsStore } from '../../../mocks/actions-store';
import { Provider } from 'react-redux';

interface IOfferCardProps {
  offer: IOffer;
  onMouseEnter?: MouseEventHandler;
  onMouseLeave?: MouseEventHandler;
}

vi.mock('../OfferCard/OfferCard', () => ({
  OfferCard: ({ offer, onMouseEnter, onMouseLeave }: IOfferCardProps) => (
    <div
      data-testid="place-card"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {offer.title}
    </div>
  ),
}));

const { mockStoreCreator } = initActionsStore();

describe('OffersList', () => {
  const mockOffers: IOffer[] = [
    {
      id: 1,
      title: 'Some place',
      type: PlacementTypes.Apartment,
      price: 120,
      rating: 4.5,
      city: { name: 'Paris', location: { latitude: 48.8566, longitude: 2.3522, zoom: 10 } },
      location: { latitude: 48.8566, longitude: 2.3522, zoom: 10 },
      isFavorite: true,
      isPremium: true,
      previewImage: 'img1.jpg',
    },
    {
      id: 2,
      title: 'Some place 2',
      type: PlacementTypes.Apartment,
      price: 80,
      rating: 3,
      city: { name: 'Paris', location: { latitude: 49.8566, longitude: 2.2522, zoom: 10 } },
      location: { latitude: 48.8566, longitude: 2.3522, zoom: 10 },
      isFavorite: true,
      isPremium: true,
      previewImage: 'img1.jpg',
    },
  ];

  const renderWithRedux = (component: JSX.Element, initialState = {}) => {
    const store = mockStoreCreator(initialState);
    return render(<Provider store={store}>{component}</Provider>);
  };

  it('should render correctly with given offers', () => {
    const mockSelectOffer = vi.fn();

    renderWithRedux(
      <OffersList
        offers={mockOffers}
        selectOffer={mockSelectOffer}
        isNearPlaces={false}
      />
    );

    const placeCards = screen.getAllByTestId('place-card');
    expect(placeCards).toHaveLength(mockOffers.length);

    expect(screen.getByText('Some place')).toBeInTheDocument();
    expect(screen.getByText('Some place 2')).toBeInTheDocument();

    const container = screen.getByTestId('offer-list-container');
    expect(container).toHaveClass('cities__places-list places__list tabs__content');
  });

  it('should render correctly with NearPlaces type', () => {

    renderWithRedux(
      <OffersList
        offers={mockOffers}
        selectOffer={vi.fn()}
        isNearPlaces
      />
    );

    const container = screen.getByTestId('offer-list-container');
    expect(container).toHaveClass('near-places__list places__list');
    expect(container).not.toHaveClass('tabs__content');
  });
});
