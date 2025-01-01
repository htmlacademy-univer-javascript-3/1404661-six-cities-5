import { PlacementTypes } from '../emuns/plecement-types.enum';
import { ICity } from './city.interface';
import { IMapPoint } from './points.interface';

/**
 * Интерфейс предложения.
 * @prop {number} id - Идентификатор.
 * @prop {string} title - Заголовок.
 * @prop {string} type - Тип.
 * @prop {string} previewImage - Изображение.
 * @prop {number} price - Цена.
 * @prop {number} rating - Рейтинг.
 * @prop {ICity} city - Город.
 * @prop {IMapPoint} location - Координаты.
 * @prop {boolean} isFavorite - Есть ли в заметках?
 * @prop {boolean} isPremium - Является ли премиумом?
 */
export interface IOffer {
  id: number;
  title: string;
  type: PlacementTypes;
  previewImage: string;
  price: number;
  rating: number;
  city: ICity;
  location: IMapPoint;
  isFavorite: boolean;
  isPremium: boolean;
}
