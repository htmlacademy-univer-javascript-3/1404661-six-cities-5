import { FC } from 'react';

import Card from '../OfferCard/OfferCard';

import { IOfferCard } from '../../../interfaces/components/offer-card.interface';

/**
 * Интерфейс компонента списка карточек преложений.
 * @prop {ICard[] | undefined} offers - Предложения.
 */
export interface IOffersList {
  offers?: IOfferCard[];
}

/**
 * Компонент списка карточек преложений.
 * @param {IOffersList} params  - Входные парамтеры компонента.
 * @returns {JSX.Element}
 */
export const OffersList: FC<IOffersList> = ({ offers }): JSX.Element => (
  <div className="cities__places-list places__list tabs__content">
    {
      offers ? offers.map((item) => (
        <Card
          key={item.id}
          id={item.id}
          title={item.title}
          type={item.type}
          image={item.image}
          price={item.price}
          rating={item.rating}
          inBookmarks={item.inBookmarks}
          isPremium={item.isPremium}
        />)
      ) : null
    }
  </div>);

export default OffersList;
