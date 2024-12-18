import { IOffer } from '../interfaces/components/offer.interface';
import { PlacementTypes } from '../emuns/plecement-types.enum';

import { CITIES } from './cities';

/**
 * Моковые данные предложений.
 */
export const FAVORITIES_OFFERS: IOffer[] = [
  {
    id: 1,
    title: 'Room in Suburbs',
    price: 100,
    rating: 4.5,
    type: PlacementTypes.Apartment,
    isPremium: false,
    image: 'img/studio-01.jpg',
    coordinates: {
      latitude: 52.3609553943508,
      longitude: 4.85309666406198
    },
    city: CITIES.Amsterdam
  },
  {
    id: 2,
    title: 'Room in Suburbs',
    price: 100,
    rating: 4.5,
    type: PlacementTypes.Apartment,
    isPremium: false,
    image: 'img/studio-01.jpg',
    coordinates: {
      latitude: 52.3609553943508,
      longitude: 4.85309666406198
    },
    city: CITIES.Amsterdam
  },
  {
    id: 3,
    title: 'House with River View',
    price: 200,
    rating: 5.0,
    type: PlacementTypes.House,
    isPremium: true,
    image: 'img/studio-01.jpg',
    coordinates: {
      latitude: 52.3809553943508,
      longitude: 4.939309666406198
    },
    city: CITIES.Paris
  },
  {
    id: 4,
    title: 'House with River View',
    price: 200,
    rating: 5.0,
    type: PlacementTypes.House,
    isPremium: true,
    image: 'img/studio-01.jpg',
    coordinates: {
      latitude: 52.3809553943508,
      longitude: 4.939309666406198
    },
    city: CITIES.Paris
  },
];
