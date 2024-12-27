import { IOffer } from '../interfaces/offer.interface';
import { ICity } from '../interfaces/city.interface';
import { IUserFull } from '../interfaces/user.inretface';
import { IOfferFull } from '../interfaces/offer-full.interface';
import { LoadingStatus } from '../emuns/statuses.enum';
import { IComment } from '../interfaces/comment.interface';

/**
 * Состояние хранилища.
 * @param {ICity} city - Город.
 * @param {IOffer[]} offers - Предложения.
 * @param {LoadingStatus} isOffersDataLoading - Загруженны ли данные предложений.
 * @param {IOffer[]} nearOffers - Ближайшие предложения.
 * @param {boolean} authorizationStatus - Пользователь авторизован?
 * @param {IUserFull | null} userData - Данные пользвателя.
 * @param {IComment[]} comments - Комментарии.
 * @param {LoadingStatus} isOfferDataLoading - Загруженны ли данные предложения.
 * @param {LoadingStatus} isCommentsDataLoading - Загруженны ли комментарии.
 * @param {IOfferFull | undefined} offer - Предложение.
 */
export type State = {
  city: ICity;
  offers: IOffer[];
  isOffersDataLoading: LoadingStatus;
  nearOffers: IOffer[];
  authorizationStatus: boolean;
  userData: IUserFull | null;
  comments: IComment[];
  isOfferDataLoading: LoadingStatus;
  isCommentsDataLoading: LoadingStatus;
  offer?: IOfferFull;
};

