import { PlacementTypes } from '../emuns/plecement-types.enum';

// Город.
export const CITY = 'Amsterdam';

// Размещения.
export const PLACEMENTS = [
  {
    id: 1,
    isPremium: true,
    image: 'img/apartment-01.jpg',
    title: 'Beautiful &amp; luxurious apartment at great location',
    type: PlacementTypes.Apartment,
    price: 120,
    rating: 4,
  },
  {
    id: 2,
    isPremium: true,
    image: 'img/room.jpg',
    price: 80,
    rating: 4,
    inBookmarks: true,
    title: 'Wood and stone place',
    type: PlacementTypes.Room,
  },
  {
    id: 3,
    image: 'img/apartment-02.jpg',
    price: 132,
    rating: 4,
    title: 'Canal View Prinsengracht',
    type: PlacementTypes.Apartment,
  },
  {
    id: 4,
    isPremium: true,
    image: 'img/apartment-03.jpg',
    price: 180,
    rating: 5,
    title: 'Nice, cozy, warm big bed apartment',
    type: PlacementTypes.Apartment,
  },
  {
    id: 5,
    image: 'img/room.jpg',
    price: 80,
    rating: 4,
    inBookmarks: true,
    title: 'Wood and stone place',
    type: PlacementTypes.Room,
  },
];
