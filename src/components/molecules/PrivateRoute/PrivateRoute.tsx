import { FC } from 'react';
import { Navigate } from 'react-router-dom';

import { AppRoute } from '../../../emuns/app-route.emun';
import { Actions } from '../../../emuns/actions.enum';

import { useAppSelector } from '../../../store/hooks';

/**
 * Интерфейс компонента приватного роута.
 * @prop {JSX.Element} children - Дочерние компоненты.
 */
interface IPrivateRouteProps {
  children: JSX.Element;
}

/**
 * Компонент приватного роута.
 * @param {IPrivateRouteProps} param - Входные параметры компонента.
 * @returns {JSX.Element}
 */
export const PrivateRoute: FC<IPrivateRouteProps> = ({ children }): JSX.Element => {
  const isAuthorized = useAppSelector((state) => state[Actions.user].authorizationStatus);

  return isAuthorized ? children : <Navigate to={AppRoute.Login} />;
};

