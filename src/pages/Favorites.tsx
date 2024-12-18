import { FC } from 'react';

import OffersList from '../components/molecules/OffersList/OffersList';

import { IOffer } from '../interfaces/components/offer.interface';

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
    new Set(props.offers.map((offer) => offer.city.title))
  );

  return (

    <div className="page">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <a className="header__logo-link" href="main.html">
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
              </a>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <a className="header__nav-link header__nav-link--profile" href="#">
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                    <span className="header__favorite-count">3</span>
                  </a>
                </li>
                <li className="header__nav-item">
                  <a className="header__nav-link" href="#">
                    <span className="header__signout">Sign out</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              {
                cities.map((city) => {

                  const cityOffers = props.offers.filter((offer) => offer.city.title === city);

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
        <a className="footer__logo-link" href="main.html">
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33" />
        </a>
      </footer>
    </div>
  );
};
