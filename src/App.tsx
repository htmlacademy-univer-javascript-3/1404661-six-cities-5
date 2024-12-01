import { FC } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Main } from './pages/Main';
import { Login } from './pages/Login';
import { Favorites } from './pages/Favorites';
import { Offer } from './pages/Offer';
import { Error } from './pages/Error';
import { PrivateRoute } from './components/molecules/PrivateRoute/PrivateRoute';

import { IOffers } from './interfaces/components/offers.interface';

import { AppRoute } from './emuns/app-route.emun';

/**
 * Компонент приложения.
 * @param {IOffers} param - Входные параметры компонента.
 * @returns {JSX.Element}
 */
export const App: FC<IOffers> = ({ ...props }): JSX.Element => {
  const isAuth = true;

  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Main} element={<Main city={props.city} offers={props.offers} />} />
        <Route path={AppRoute.Login} element={<Login />} />
        <Route path={AppRoute.Favorites} element={
          <PrivateRoute isAuthorized={isAuth}>
            <Favorites {...props} />
          </PrivateRoute>
        }
        />
        <Route path={AppRoute.Offer} element={<Offer />} />
        <Route
          path="*"
          element={<Error />}
        />
      </Routes>
    </BrowserRouter>
  );
};
