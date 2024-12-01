import { PlacementTypes } from '../emuns/plecement-types.enum';

export const OFFERS = {
  'city': 'Maracle City',
  'offers': [
    {
      id: 1,
      title: 'Luxury Apartment in Downtown',
      price: 450,
      rating: 4.9,
      type: PlacementTypes.Apartment,
      isPremium: true,
      image: 'img/apartment-01.jpg',
    },
    {
      id: 2,
      title: 'Room in Suburbs',
      price: 100,
      rating: 4.5,
      type: PlacementTypes.Apartment,
      isPremium: false,
      image: 'img/studio-01.jpg',
    },
    {
      id: 3,
      title: 'Stylish Studio in City Center',
      price: 150,
      rating: 4,
      type: PlacementTypes.Room,
      isPremium: false,
      image: 'img/room.jpg',
    },
    {
      id: 4,
      title: 'House with River View',
      price: 200,
      rating: 5.0,
      type: PlacementTypes.House,
      isPremium: true,
      image: 'img/studio-01.jpg',
    },
  ]
};
