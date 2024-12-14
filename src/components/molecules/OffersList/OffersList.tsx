import { FC } from 'react';

import Card from '../OfferCard/OfferCard';

import { IOfferCard } from '../../../interfaces/components/offer-card.interface';

/**
 * Интерфейс компонента списка карточек преложений.
 * @prop {{(selectedOffer: IOfferCard) => void} | undefined} selectOffer - Функция выбора предложения.
 * @prop {ICard[] | undefined} offers - Предложения.
 */
export interface IOffersList {
  selectOffer?: (selectedOffer: IOfferCard) => void;
  offers?: IOfferCard[];
}

/**
 * Компонент списка карточек преложений.
 * @param {IOffersList} params  - Входные парамтеры компонента.
 * @returns {JSX.Element}
 */
export const OffersList: FC<IOffersList> = ({ selectOffer, offers }): JSX.Element => (
  <div className="cities__places-list places__list tabs__content">
    {
      offers ? offers.map((item) => (
        <div onMouseDown={() => selectOffer?.(item)} key={item.id}>
          <Card
            id={item.id}
            title={item.title}
            type={item.type}
            image={item.image}
            price={item.price}
            rating={item.rating}
            inBookmarks={item.inBookmarks}
            isPremium={item.isPremium}
          />
        </div>)
      ) : null
    }
  </div>);

export default OffersList;
