import { FC } from 'react';

import { ReviewItem } from '../../atoms/ReviewItem/ReviewItem';

import { IComment } from '../../../interfaces/comment.interface';

/**
 * Интерфейс компонента списка отзывов.
 * @prop {IReviewItem[]} reviews - Отзывы.
 */
interface IReviewsList {
  reviews: IComment[];
}

/**
 * Компонент списка отзывов.
 * @param {IReviewsList} params - Входные парамтеры компонента.
 * @returns {JSX.Element}
 */
export const ReviewsList: FC<IReviewsList> = ({ reviews }): JSX.Element => (
  <>
    <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
    <ul className="reviews__list">
      {
        reviews.map((item) => (
          <ReviewItem
            key={item.id}
            comment={item}
          />
        ))
      }
    </ul>
  </>
);
