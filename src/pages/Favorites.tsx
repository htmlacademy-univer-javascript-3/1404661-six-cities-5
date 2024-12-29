import { Link, Navigate } from 'react-router-dom';

import { OffersList } from '../components/molecules/OffersList/OffersList';
import { Header } from '../components/molecules/Header/Header';

import { AppRoute } from '../emuns/app-route.emun';
import { useAppSelector } from '../store/hooks';
import { Actions } from '../emuns/actions.enum';
import { LoadingStatus } from '../emuns/statuses.enum';

/**
 * Компонент страницы избранного.
 * @param {IFavoritesProps} param - Входные параметры компонента.
 * @returns {JSX.Element}
 */
export const Favorites = (): JSX.Element => {

  const favorites = useAppSelector((state) => state[Actions.favorites].favorites);

  const isLoading = useAppSelector((state) => state[Actions.favorites].isFavoritesDataLoading);

  const isAuthorized = useAppSelector((state) => state[Actions.user].authorizationStatus);

  /**
   * Города избранных вариантов.
   */
  const cities = Array.from(
    new Set(favorites.map((offer) => offer.city.name))
  );

  if (!isAuthorized) {
    return <Navigate to={AppRoute.Login} />;
  }

  return (
    <div className={`page ${favorites.length === 0 ? 'page--favorites-empty' : ''}`}>
      <Header />
      <main className={`page__main page__main--favorites ${favorites.length === 0 ? 'page__main--favorites-empty' : ''}`}>
        <div className="page__favorites-container container">
          <section className={`favorites ${favorites.length === 0 ? 'favorites--empty' : ''}`}>
            {
              ((isLoading === LoadingStatus.Failure || isLoading === LoadingStatus.Success) && favorites.length === 0) ?
                <>
                  <h1 className="visually-hidden">Favorites (empty)</h1>
                  <div className="favorites__status-wrapper">
                    <b className="favorites__status">Nothing yet saved.</b>
                    <p className="favorites__status-description">Save properties to narrow down search or plan your future trips.</p>
                  </div>
                </>
                :
                <ul className="favorites__list">
                  {
                    cities.map((city) => {

                      const cityOffers = favorites.filter((offer) => offer.city.name === city);

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
            }
          </section>
        </div>
      </main >
      <footer className="footer container">
        <Link className="footer__logo-link" to={AppRoute.Main}>
          <img className="footer__logo" src="/img/logo.svg" alt="6 cities logo" width="64" height="33" />
        </Link>
      </footer>
    </div >
  );
};
