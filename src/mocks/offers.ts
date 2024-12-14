import { IOffers } from '../interfaces/components/offers.interface';
import { PlacementTypes } from '../emuns/plecement-types.enum';

/**
 * Моковые данные предложений.
 */
export const OFFERS: IOffers = {
  city: {
    title: 'Maracle City',
    latitude: 52.4,
    longitude: 4.9
  },
  offers: [
    {
      id: 1,
      title: 'Luxury Apartment in Downtown',
      price: 450,
      rating: 4.9,
      type: PlacementTypes.Apartment,
      isPremium: true,
      image: 'img/apartment-01.jpg',
      coordinates: {
        latitude: 52.3909553943508,
        longitude: 4.85309666406198
      }
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
      }
    },
    {
      id: 3,
      title: 'Stylish Studio in City Center',
      price: 150,
      rating: 4,
      type: PlacementTypes.Room,
      isPremium: false,
      image: 'img/room.jpg',
      coordinates: {
        latitude: 52.3909553943508,
        longitude: 4.929309666406198
      }
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
      }
    },
  ]
};
