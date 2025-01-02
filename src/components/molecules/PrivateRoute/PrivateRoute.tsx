import { FC } from 'react';
import { Navigate } from 'react-router-dom';

import { AppRoute } from '../../../emuns/app-route.emun';

/**
 * Интерфейс компонента приватного роута.
 * @prop {boolean} isAuthorized - Авторизован ли пользователь?
 * @prop {JSX.Element} children - Дочерние компоненты.
 */
interface IPrivateRouteProps {
  isAuthorized: boolean;
  children: JSX.Element;
}

/**
 * Компонент приватного роута.
 * @param {IPrivateRouteProps} param - Входные параметры компонента.
 * @returns {JSX.Element}
 */
export const PrivateRoute: FC<IPrivateRouteProps> = ({ isAuthorized, children }): JSX.Element => isAuthorized ? children : <Navigate to={AppRoute.Login} />;

