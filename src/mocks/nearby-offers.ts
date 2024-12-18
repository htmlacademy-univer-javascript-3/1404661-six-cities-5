import { IOffer } from '../interfaces/components/offer.interface';
import { PlacementTypes } from '../emuns/plecement-types.enum';
import { CITIES } from './cities';

/**
 * Моковые данные предложений.
 */
export const NEAR_BY_OFFERS: IOffer[] = [
  {
    id: 1,
    title: 'Wood and stone place',
    price: 80,
    rating: 4,
    type: PlacementTypes.Room,
    image: 'img/room.jpg',
    coordinates: {
      latitude: 52.3509553943508,
      longitude: 4.86309666406198
    },
    city: CITIES.Amsterdam
  },
  {
    id: 2,
    title: 'Canal View Prinsengracht',
    price: 132,
    rating: 4,
    type: PlacementTypes.Apartment,
    image: 'img/apartment-02.jpg',
    coordinates: {
      latitude: 52.3709553943508,
      longitude: 4.82309666406198
    },
    city: CITIES.Amsterdam
  },
  {
    id: 3,
    title: 'Nice, cozy, warm big bed apartment',
    price: 180,
    rating: 4,
    type: PlacementTypes.Apartment,
    isPremium: true,
    image: 'img/apartment-03.jpg',
    coordinates: {
      latitude: 52.3809553943508,
      longitude: 4.949309666406198
    },
    city: CITIES.Paris
  }
];
