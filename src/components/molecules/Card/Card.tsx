import { FC } from 'react';
import classNames from 'classnames';

import { ICard } from '../../../interfaces/components/card.interface';

/**
 * Компонент карточки.
 * @param {ICard} params  - Входные парамтеры компонента.
 * @returns {JSX.Element}
 */
export const Card: FC<ICard> = ({
  title,
  type,
  image,
  price,
  rating,
  inBookmarks = false,
  isPremium = false
}): JSX.Element => {

  const persentRating = rating * 20;

  return (
    <article className="cities__card place-card">
      {
        isPremium ?
          <div className="place-card__mark">
            <span>Premium</span>
          </div> :
          null
      }
      <div className="cities__image-wrapper place-card__image-wrapper">
        <a href="#">
          <img className="place-card__image" src={image} width="260" height="200" alt="Place image" />
        </a>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className={classNames('place-card__bookmark-button', 'button', inBookmarks ? 'place-card__bookmark-button--active' : '')} type="button">
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ 'width': `${persentRating}%` }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <a href="#">{title}</a>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
};

export default Card;
