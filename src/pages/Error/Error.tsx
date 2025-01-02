import { FC } from 'react';
import { Link } from 'react-router-dom';

import { AppRoute } from '../../emuns/app-route.emun';

/**
 * Компонент страницы ошибки.
 * @returns {JSX.Element}
 */
export const Error: FC = (): JSX.Element => (
  <div style={{ width: '100%', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'white' }}>
    <h1>404 Not Found</h1>
    <Link to={AppRoute.Main} style={{ color: 'blue' }}>Return to main page</Link>
  </div>
);
