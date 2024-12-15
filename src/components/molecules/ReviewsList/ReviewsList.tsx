import { FC } from 'react';
import { IReviewItem } from '../../../interfaces/components/review-item.interface';
import ReviewItem from '../ReviewItem/ReviewItem';

interface IReviewsList {
  reviews: IReviewItem[];
}

/**
 * Компонент списка отзывов.
 * @returns
 */
export const ReviewsList: FC<IReviewsList> = ({ reviews }) => (
  <>
    <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
    <ul className="reviews__list">
      {
        reviews.map((item) => (
          <ReviewItem
            key={item.id}
            id={item.id}
            user={item.user}
            rating={item.rating}
            comment={item.comment}
            date={item.date}
          />
        ))
      }
    </ul>
  </>
);

export default ReviewsList;
