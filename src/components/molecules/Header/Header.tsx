import { Link, useLocation } from 'react-router-dom';

import { AppRoute } from '../../../emuns/app-route.emun';
import { Actions } from '../../../emuns/actions.enum';

import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { userLogout } from '../../../store/api-actions';

/**
 * Компонент шапки страницы.
 * @returns {JSX.Element}
 */
export const Header = (): JSX.Element => {

  const location = useLocation();

  const isLoginPage = location.pathname === AppRoute.Login.toString();

  const dispatch = useAppDispatch();

  const isAuthorized = useAppSelector((state) => state[Actions.user].authorizationStatus);

  const userData = useAppSelector((state) => state[Actions.user].userData);

  /**
   * Выход из приложения.
   */
  const handleLogout = () => {
    dispatch(userLogout());
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link className="header__logo-link header__logo-link--active" to={AppRoute.Main}>
              <img className="header__logo" src="/img/logo.svg" alt="6 cities logo" width="81" height="41" />
            </Link>
          </div>
          {
            !isLoginPage
            &&
            <nav className="header__nav">
              <ul className="header__nav-list">
                {isAuthorized ? (
                  <>
                    <li className="header__nav-item user">
                      <Link
                        className="header__nav-link header__nav-link--profile"
                        to={AppRoute.Favorites}
                      >
                        <div className="header__avatar-wrapper user__avatar-wrapper" />
                        <span className="header__user-name user__name">
                          {userData?.name}
                        </span>
                        <span className="header__favorite-count">fav</span>
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
