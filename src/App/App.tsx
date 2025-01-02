import { Route, Routes } from 'react-router-dom';

import { Main } from '../pages/Main/Main';
import { Login } from '../pages/Login/Login';
import { Favorites } from '../pages/Favorites/Favorites';
import { Offer } from '../pages/Offer/Offer';
import { Error } from '../pages/Error/Error';
import { PrivateRoute } from '../components/molecules/PrivateRoute/PrivateRoute';

import { AppRoute } from '../emuns/app-route.emun';
import { Actions } from '../emuns/actions.enum';

import { useAppDispatch, useAppSelector } from '../store/hooks';
import { changeFavorite, fetchOffer } from '../store/api-actions';

/**
 * Компонент приложения.
 * @returns {JSX.Element}
 */
export const App = (): JSX.Element => {

  const dispatch = useAppDispatch();

  const isAuthorized = useAppSelector((state) => state[Actions.user].authorizationStatus);

  /**
  * Дабавление в изабранное.
  * @param {string} offerId - Идентификатор предложения.
  * @param {boolean | undefined} favoriteStatus - Статус предложения.
  * @param {string | undefined} offerPageId - Идентификатор страницы предложения.
  */
  const onFavoriteClick = (offerId: string, favoriteStatus?: boolean, offerPageId?: string) => {
    dispatch(
      changeFavorite({
        offerId: offerId,
        favoriteStatus: !favoriteStatus,
        offerPageId: offerPageId
      }),
    ).then(() => {
      if (!offerPageId) {
        return;
      }

      dispatch(fetchOffer(offerId));
    });
  };

  return (
    <Routes>
      <Route path={AppRoute.Main} element={<Main isAuthorized={isAuthorized} />} />
      <Route path={AppRoute.Login} element={<Login isAuthorized={isAuthorized} />} />
      <Route path={AppRoute.Favorites} element={
        <PrivateRoute isAuthorized={isAuthorized}>
          <Favorites isAuthorized={isAuthorized} />
        </PrivateRoute>
      }
      />
      <Route path={AppRoute.Offer} element={<Offer isAuthorized={isAuthorized} onFavouriteClick={onFavoriteClick} />} />
      <Route path="*" element={<Error />} />
    </Routes>
  );
};

