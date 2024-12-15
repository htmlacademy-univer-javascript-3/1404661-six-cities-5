import { IReviewItem } from '../interfaces/components/review-item.interface';

/**
 * Моковые данные комментариев.
 */
export const Reviews: IReviewItem[] = [
  {
    id: 1,
    user: {
      avatar: 'img/avatar-max.jpg',
      name: 'Max - 1',
    },
    rating: 4,
    comment: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.',
    date: 'April 2019'
  },
  {
    id: 2,
    user: {
      avatar: 'img/avatar-max.jpg',
      name: 'Max - 2',
    },
    rating: 4,
    comment: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.',
    date: 'April 2019'
  },
  {
    id: 3,
    user: {
      avatar: 'img/avatar-max.jpg',
      name: 'Max - 3',
    },
    rating: 4,
    comment: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.',
    date: 'April 2019'
  }
];
