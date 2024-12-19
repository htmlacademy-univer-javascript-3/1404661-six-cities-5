import { FC } from 'react';
import classNames from 'classnames';

import Card from '../OfferCard/OfferCard';

import { IOffer } from '../../../interfaces/components/offer.interface';

/**
 * Интерфейс компонента списка карточек преложений.
 * @prop {{(selectedOffer: IOffer) => void} | undefined} selectOffer - Функция выбора предложения.
 * @prop {ICard[] | undefined} offers - Предложения.
 * @prop {boolean | undefined} isNearPlaces - Предложения рядом?
 */
export interface IOffersList {
  selectOffer?: (selectedOffer: IOffer | null) => void;
  offers?: IOffer[];
  isNearPlaces?: boolean;
}

/**
 * Компонент списка карточек преложений.
 * @param {IOffersList} params  - Входные парамтеры компонента.
 * @returns {JSX.Element}
 */
export const OffersList: FC<IOffersList> = ({ selectOffer, offers, isNearPlaces = false }): JSX.Element => (
  <div className={classNames(isNearPlaces ? 'near-places__list' : 'cities__places-list', 'places__list', !isNearPlaces && 'tabs__content')}>
    {
      offers ? offers.map((item) => (
        <div
          onMouseEnter={() => selectOffer?.(item)}
          onMouseLeave={() => selectOffer?.(null)}
          key={item.id}
        >
          <Card
            id={item.id}
            title={item.title}
            type={item.type}
            image={item.image}
            price={item.price}
            rating={item.rating}
            inBookmarks={item.inBookmarks}
            isPremium={item.isPremium}
            isNearPlaces={isNearPlaces}
            city={item.city}
          />
        </div>)
      ) : null
    }
  </div>);

export default OffersList;
