import { FC } from 'react';
import { Link, Navigate } from 'react-router-dom';

import { Header } from '../../components/molecules/Header/Header';
import { FavoritesList } from '../../components/molecules/FavoritesList/FavoritesList';

import { AppRoute } from '../../emuns/app-route.emun';
import { Actions } from '../../emuns/actions.enum';
import { LoadingStatus } from '../../emuns/statuses.enum';

import { useAppSelector } from '../../store/hooks';

/**
 * Интерфейс компонента страницы избранного.
 * @prop {boolean} isAuthorized -  Авторизован ли пользователь?
 */
interface IFavoritesProps {
  isAuthorized: boolean;
}

/**
 * Компонент страницы избранного.
 * @param {IFavoritesProps} param - Входные параметры компонента.
 * @returns {JSX.Element}
 */
export const Favorites: FC<IFavoritesProps> = ({ isAuthorized }): JSX.Element => {

  const favorites = useAppSelector((state) => state[Actions.favorites].favorites);

  const isLoading = useAppSelector((state) => state[Actions.favorites].isFavoritesDataLoading);

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
      <Header isAuthorized={isAuthorized} />
      <main className={`page__main page__main--favorites ${favorites.length === 0 ? 'page__main--favorites-empty' : ''}`}>
        <div className="page__favorites-container container" data-testid='saved-list'>
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
                <>
                  <h1 className="favorites__title">Saved listing</h1>
                  <FavoritesList cities={cities} favoritesOffers={favorites} />
                </>
            }
          </section>
        </div>
      </main >
      <footer className="footer container" data-testid="favourite-page-footer">
        <Link className="footer__logo-link" to={AppRoute.Main}>
          <img className="footer__logo" src="/img/logo.svg" alt="6 cities logo" width="64" height="33" />
        </Link>
      </footer>
    </div >
  );
};
