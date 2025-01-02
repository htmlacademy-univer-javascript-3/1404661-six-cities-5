import { render, screen } from '@testing-library/react';
import { describe, it } from 'vitest';

import { Map } from './map.tsx';

import { IOffer } from '../../../interfaces/offer.interface.ts';
import { PlacementTypes } from '../../../emuns/plecement-types.enum.ts';

import { CITIES } from '../../../constants/cities.ts';

describe('Map', () => {

  it('renders a Map container correct', () => {
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

    render(
      <Map
        currentCity={CITIES.Amsterdam}
        offers={mockOffers}
        selectedOffer={null}
      />
    );

    const mapContainer = screen.getByTestId('map-test');
    expect(mapContainer).toBeInTheDocument();
    expect(mapContainer).toHaveStyle({ height: '500px' });
  });

});
