import { Link } from 'react-router-dom';

import { AppRoute } from '../../../emuns/app-route.emun';

/**
 * Компонент логотипа.
 * @returns {JSX.Element}
 */
export const logo = () => (
  <Link className="header__logo-link header__logo-link--active" to={AppRoute.Main}>
    <img className="header__logo" src="/img/logo.svg" alt="6 cities logo" width="81" height="41" />
  </Link>
);
