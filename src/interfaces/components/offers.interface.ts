import { IMapPoint } from '../points.interface';
import { IOffer } from './offer.interface';

/**
 * Интерфейс предложений.
 * @prop {string} city - Город.
 * @prop {ICard[]} offers - Предложения.
 */
export interface IOffers {
  city: IMapPoint;
  offers: IOffer[];
}
