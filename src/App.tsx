import { Route, Routes } from 'react-router-dom';

import { Main } from './pages/Main/Main';
import { Login } from './pages/Login';
import { Favorites } from './pages/Favorites';
import { Offer } from './pages/Offer';
import { Error } from './pages/Error';
import { PrivateRoute } from './components/molecules/PrivateRoute/PrivateRoute';

import { AppRoute } from './emuns/app-route.emun';

/**
 * Компонент приложения.
 * @param {IOffers} param - Входные параметры компонента.
 * @returns {JSX.Element}
 */
export const App = (): JSX.Element => (
  <Routes>
    <Route path={AppRoute.Main} element={<Main />} />
    <Route path={AppRoute.Login} element={<Login />} />
    <Route path={AppRoute.Favorites} element={
      <PrivateRoute>
        <Favorites />
      </PrivateRoute>
    }
    />
    <Route path={AppRoute.Offer} element={<Offer />} />
    <Route path="*" element={<Error />} />
  </Routes>
);
