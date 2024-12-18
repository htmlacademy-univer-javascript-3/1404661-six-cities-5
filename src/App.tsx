import { FC } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Main } from './pages/Main/Main';
import { Login } from './pages/Login';
import { Favorites } from './pages/Favorites';
import { Offer } from './pages/Offer';
import { Error } from './pages/Error';
import { PrivateRoute } from './components/molecules/PrivateRoute/PrivateRoute';

import { IOffer } from './interfaces/components/offer.interface';
import { AppRoute } from './emuns/app-route.emun';

/**
 * Интерфейс компонента приложения.
 * @prop {IOffer[]} offers - Предложения.
 */
export interface IAppProps {
  offers: IOffer[];
}

/**
 * Компонент приложения.
 * @param {IOffers} param - Входные параметры компонента.
 * @returns {JSX.Element}
 */
export const App: FC<IAppProps> = ({ ...props }): JSX.Element => {
  const isAuth = true;

  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Main} element={<Main />} />
        <Route path={AppRoute.Login} element={<Login />} />
        <Route path={AppRoute.Favorites} element={
          <PrivateRoute isAuthorized={isAuth}>
            <Favorites offers={props.offers} />
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
