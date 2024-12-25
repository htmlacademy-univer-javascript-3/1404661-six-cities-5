import { IOffer } from '../interfaces/components/offer.interface';
import { ICity } from '../interfaces/city.interface';
import { IUserFull } from '../interfaces/user.inretface';

/**
 * Состояние хранилища.
 * @param {ICity} city - Город.
 * @param {IOffer[]} offers - Предложения.
 * @param {boolean} isOffersDataLoading - Загруженны ли данные.
 * @param {IOffer[]} nearOffers - Ближайшие предложения.
 * @param {boolean} authorizationStatus - Пользователь авторизован?
 * @param {IUserFull | null} userData - Данные пользвателя.
 */
export type State = {
  city: ICity;
  offers: IOffer[];
  isOffersDataLoading: boolean;
  nearOffers: IOffer[];
  authorizationStatus: boolean;
  userData: IUserFull | null;
};

