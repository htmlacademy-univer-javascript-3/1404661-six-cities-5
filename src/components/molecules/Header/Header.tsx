import { Link, useLocation } from 'react-router-dom';
import { FC, useEffect, useMemo } from 'react';

import { Logo } from '../../atoms/Logo/Logo';

import { AppRoute } from '../../../emuns/app-route.emun';
import { Actions } from '../../../emuns/actions.enum';

import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { fetchFavorites, userLogout } from '../../../store/api-actions';

/**
 * Интерфейс компонента шапки страницы.
 * @prop {boolean} isAuthorized -  Авторизован ли пользователь?
 */
interface IHeaderProps {
  isAuthorized: boolean;
}

/**
 * Компонент шапки страницы.
 * @param {IHeaderProps} params - Входные параметры компонента.
 * @returns {JSX.Element}
 */
export const Header: FC<IHeaderProps> = ({ isAuthorized }): JSX.Element => {

  const location = useLocation();

  const isLoginPage = location.pathname === AppRoute.Login.toString();

  const dispatch = useAppDispatch();

  const userData = useAppSelector((state) => state[Actions.user].userData);

  const favorites = useAppSelector((state) => state[Actions.favorites].favorites);

  /**
   * Загрузка избранных предложений.
   */
  useEffect(() => {
    if (isAuthorized) {
      dispatch(fetchFavorites());
    }
  }, [dispatch, isAuthorized, userData]);

  /**
   * Выход из приложения.
   */
  const handleLogout = () => {
    dispatch(userLogout());
  };

  /**
   * Количество избранных предложений.
   */
  const favoritesCount = useMemo(() => <span className="header__favorite-count">{favorites && favorites.length}</span>, [favorites]);

  return (
    <header className="header">
      <div className="container" data-testid="user-info">
        <div className="header__wrapper">
          <div className="header__left">
            <Logo />
          </div>
          {
            !isLoginPage
            &&
            <nav className="header__nav">
              <ul className="header__nav-list">
                {isAuthorized ? (
                  <>
                    <li className="header__nav-item user" data-testid="item-for-auth">
                      <Link
                        className="header__nav-link header__nav-link--profile"
                        to={AppRoute.Favorites}
                      >
                        <div className="header__avatar-wrapper user__avatar-wrapper" />
                        <span className="header__user-name user__name">
                          {userData?.name}
                        </span>
                        {favoritesCount}
                      </Link>
                    </li>
                    <li className="header__nav-item">
                      <a className="header__nav-link" onClick={handleLogout}>
                        <span className="header__signout">Sign out</span>
                      </a>
                    </li>
                  </>
                ) : (
                  <li className="header__nav-item user">
                    <Link
                      className="header__nav-link header__nav-link--profile"
                      to={AppRoute.Login}
                    >
                      <div className="header__avatar-wrapper user__avatar-wrapper" />
                      <span className="header__login">Sign in</span>
                    </Link>
                  </li>
                )}
              </ul>
            </nav>
          }
        </div>
      </div>
    </header>
  );
};
