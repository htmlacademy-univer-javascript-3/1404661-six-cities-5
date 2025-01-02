import { FC } from 'react';

import { Rating } from '../rating/rating';

import { IComment } from '../../../interfaces/comment.interface';

import { convertDateToMonthWordYear, convertDateToYearMonthDay } from '../../../helpers/convert-dates.helper';

/**
 * Компонент списка отзывов.
 * @prop {IComment} comment - Комментарий.
 */
interface IReviewItemProps {
  comment: IComment;
}

/**
 * Компонент списка отзывов.
 * @param {IReviewItemProps} params - Входные парамтеры компонента.
 * @returns {React.FC}
 */
export const ReviewItem: FC<IReviewItemProps> = ({ comment }) => (
  <li className="reviews__item">
    <div className="reviews__user user">
      <div className="reviews__avatar-wrapper user__avatar-wrapper">
        <img className="reviews__avatar user__avatar" src={comment.user.avatarUrl} width="54" height="54" alt="Reviews avatar" />
      </div>
      <span className="reviews__user-name">{comment.user.name}</span>
    </div>
    <div className="reviews__info">
      <Rating score={comment.rating} hasText={false} />
      <p className="reviews__text">{comment.comment}</p>
      <time className="reviews__time" dateTime={convertDateToYearMonthDay(new Date(comment.date))}>{convertDateToMonthWordYear(new Date(comment.date))}</time>
    </div>
  </li>
);
