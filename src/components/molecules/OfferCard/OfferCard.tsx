import { FC } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

import { IOffer } from '../../../interfaces/components/offer.interface';

/**
 * Интерфейс компонента карточки предложения.
 * @prop {boolean | undefined} isNearPlaces - Предложения рядом?
 */
interface IOfferProps extends IOffer {
  isNearPlaces?: boolean;
}

/**
 * Компонент карточки предложения.
 * @param {ICard} params  - Входные парамтеры компонента.
 * @returns {JSX.Element}
 */
export const OfferCard: FC<IOfferProps> = ({
  id,
  title,
  type,
  previewImage,
  price,
  rating,
  inBookmarks = false,
  isPremium = false,
  isNearPlaces = false
}): JSX.Element => {

  const persentRating = rating * 20;

  return (
    <article className={classNames(isNearPlaces ? 'near-places__card' : 'cities__card', 'place-card')}>
      {
        isPremium ?
          <div className="place-card__mark">
            <span>Premium</span>
          </div> :
          null
      }
      <div className={classNames(isNearPlaces ? 'near-places__image-wrapper' : 'cities__image-wrapper', 'place-card__image-wrapper')}>
        <Link to={`/offer/${id}`}>
          <img className="place-card__image" src={previewImage} width="260" height="200" alt="Place image" />
        </Link>
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
          <Link to={`/offer/${id}`}>{title}</Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
};

export default OfferCard;
