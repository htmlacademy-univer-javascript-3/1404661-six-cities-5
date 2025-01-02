import { FC } from 'react';

import { OffersList } from '../offers-list/offers-list';

import { IOffer } from '../../../interfaces/offer.interface';

/**
 * Интерфейс компонента списка избранных предложений.
 * @prop {string[]} cities - Города.
 * @prop {IOffer[]} favoritesOffers - Избранные предложения.
 */
interface IFavoritesListProps {
  cities: string[];
  favoritesOffers: IOffer[];
}

/**
 * Компонент списка избранных предложений.
 * @param {IFavoritesListProps} params - Входные параметры компонента.
 * @returns {JSX.Element}
 */
export const FavoritesList: FC<IFavoritesListProps> = ({ cities, favoritesOffers }) => (
  <ul className="favorites__list" data-testid="favourite-list">
    {
      cities.map((city) => {

        const cityOffers = favoritesOffers.filter((offer) => offer.city.name === city);

        return (
          <li className="favorites__locations-items" key={city}>
            <div className="favorites__locations locations locations--current">
              <div className="locations__item">
                <a className="locations__item-link" href="#">
                  <span>{city}</span>
                </a>
              </div>
            </div>
            <OffersList offers={cityOffers} />
          </li>
        );
      })
    }
  </ul>
);
