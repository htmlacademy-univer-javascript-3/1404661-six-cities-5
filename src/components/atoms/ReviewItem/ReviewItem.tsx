import { FC } from 'react';

import { IComment } from '../../../interfaces/comment.interface';

import { dateToMonthWordYear, dateToYearMonthDay } from '../../../helpers/dates';

/**
 * Компонент списка отзывов.
 * @returns {React.FC}
 */
export const ReviewItem: FC<IComment> = ({ user, rating, comment, date }) => (
  <li className="reviews__item">
    <div className="reviews__user user">
      <div className="reviews__avatar-wrapper user__avatar-wrapper">
        <img className="reviews__avatar user__avatar" src={user.avatarUrl} width="54" height="54" alt="Reviews avatar" />
      </div>
      <span className="reviews__user-name">{user.name}</span>
    </div>
    <div className="reviews__info">
      <div className="reviews__rating rating">
        <div className="reviews__stars rating__stars">
          <span style={{ 'width': `${Math.floor(rating + 0.5) * 20}%` }}></span>
          <span className="visually-hidden">Rating</span>
        </div>
      </div>
      <p className="reviews__text">{comment}</p>
      <time className="reviews__time" dateTime={dateToYearMonthDay(new Date(date))}>{dateToMonthWordYear(new Date(date))}</time>
    </div>
  </li>
);
