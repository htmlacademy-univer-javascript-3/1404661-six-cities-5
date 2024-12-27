import { FC } from 'react';
import { Link } from 'react-router-dom';

import OffersList from '../components/molecules/OffersList/OffersList';
import { Header } from '../components/molecules/Header/Header';

import { IOffer } from '../interfaces/offer.interface';
import { AppRoute } from '../emuns/app-route.emun';

/**
 * Интерфейс компонента страницы избранного.
 * @prop {IOffer[]} offers - предложения.
 */
interface IFavoritesProps {
  offers: IOffer[];
}
/**
 * Компонент страницы избранного.
 * @param {IFavoritesProps} param - Входные параметры компонента.
 * @returns {JSX.Element}
 */
export const Favorites: FC<IFavoritesProps> = ({ ...props }): JSX.Element => {

  /**
   * Города избранных вариантов.
   */
  const cities = Array.from(
    new Set(props.offers.map((offer) => offer.city.name))
  );

  return (
    <div className="page">
      <Header />
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              {
                cities.map((city) => {

                  const cityOffers = props.offers.filter((offer) => offer.city.name === city);

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
          </section>
        </div>
      </main>
      <footer className="footer container">
        <Link className="footer__logo-link" to={AppRoute.Main}>
          <img className="footer__logo" src="/img/logo.svg" alt="6 cities logo" width="64" height="33" />
        </Link>
      </footer>
    </div>
  );
};
