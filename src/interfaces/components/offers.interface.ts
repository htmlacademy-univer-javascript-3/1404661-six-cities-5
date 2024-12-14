import { IMapPoint } from '../points.interface';
import { IOfferCard } from './offer-card.interface';

/**
 * Интерфейс предложений.
 * @prop {string} city - Город.
 * @prop {ICard[]} offers - Предложения.
 */
export interface IOffers {
  city: IMapPoint;
  offers: IOfferCard[];
}
