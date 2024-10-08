import { FC } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Main } from './pages/Main';
import { Login } from './pages/Login';
import { Favorites } from './pages/Favorites';
import { Offer } from './pages/Offer';
import { Error } from './pages/Error';
import { PrivateRoute } from './components/molecules/PrivateRoute/PrivateRoute';

import { ICard } from './interfaces/components/card.interface';
import { AppRoute } from './emuns/app-route.emun';

/**
 * Интерфейс компонента приложения.
 * @prop {string} city - Город.
 * @prop {ICard[]} offers - Предложения.
 */
interface IApp {
  city: string;
  offers: ICard[];
}

/**
 * Компонент приложения.
 * @returns {JSX.Element}
 */
export const App: FC<IApp> = ({ city, offers }): JSX.Element => {
  const isAuth = false;

  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Main} element={<Main city={city} offers={offers} />} />
        <Route path={AppRoute.Login} element={<Login />} />
        <Route path={AppRoute.Favorites} element={
          <PrivateRoute isAuthorized={isAuth}>
            <Favorites />
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
