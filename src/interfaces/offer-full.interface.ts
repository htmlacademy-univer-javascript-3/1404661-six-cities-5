import { IUser } from './user.inretface';
import { IOffer } from './offer.interface';

/**
 * Интерфейс предложения с полной информацией.
 * @prop {string} description - Описание.
 * @prop {number} bedrooms - Количество комнат.
 * @prop {string[]} goods - Удобства.
 * @prop {IUser} host - Хозяин.
 * @prop {string[]} images - Изображения.
 * @prop {number} maxAdults - Максимальное количество людей.
 */
export interface IOfferFull extends IOffer {
  description: string;
  bedrooms: number;
  goods: string[];
  host: IUser;
  images: string[];
  maxAdults: number;
}
