import { FC, useCallback } from 'react';
import classNames from 'classnames';

import { OfferCard } from '../OfferCard/OfferCard';

import { IOffer } from '../../../interfaces/offer.interface';

import { useAppDispatch } from '../../../store/hooks';
import { changeFavorite } from '../../../store/api-actions';

/**
 * Интерфейс компонента списка карточек преложений.
 * @prop {{(selectedOffer: IOffer) => void} | undefined} selectOffer - Функция выбора предложения.
 * @prop {ICard[] | undefined} offers - Предложения.
 * @prop {boolean | undefined} isNearPlaces - Предложения рядом?
 * @prop {string | undefined} offerPage - Идентификатор страницы предложения.
 */
export interface IOffersList {
  selectOffer?: (selectedOffer: IOffer | null) => void;
  offers?: IOffer[];
  isNearPlaces?: boolean;
  offerPage?: string;
}

/**
 * Компонент списка карточек предложений.
 * @param {IOffersList} params  - Входные парамтеры компонента.
 * @returns {JSX.Element}
 */
export const OffersList: FC<IOffersList> = ({ selectOffer, offers, offerPage, isNearPlaces = false }) => {

  const dispatch = useAppDispatch();

  /**
   * Дабавление в изабранное.
   */
  const onFavoriteClick = useCallback((id: string, isFavorite: boolean) => {
    if (offerPage) {
      dispatch(
        changeFavorite({
          offerId: String(id),
          favoriteStatus: !isFavorite,
          offerPageId: offerPage
        }),
      );
    } else {
      dispatch(
        changeFavorite({
          offerId: String(id),
          favoriteStatus: !isFavorite,
        }),
      );
    }
  }, [dispatch, offerPage]);

  if (!offers) {
    return null;
  }

  return (
    <div
      className={classNames(isNearPlaces ? 'near-places__list' : 'cities__places-list', 'places__list', !isNearPlaces && 'tabs__content')}
      data-testid="offer-list-container"
    >
      {
        offers.map((item) => (
          <OfferCard
            key={item.id}
            offer={item}
            isNearPlaces={isNearPlaces}
            onClick={onFavoriteClick}
            onMouseEnter={() => selectOffer?.(item)}
            onMouseLeave={() => selectOffer?.(null)}
          />
        ))
      }
    </div>
  );
};
