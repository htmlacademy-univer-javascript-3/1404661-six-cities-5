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
 * @prop {IMapPoint | undefined} location - Координаты.
 * @prop {boolean | undefined} inBookmarks - Есть ли в заметках?
 * @prop {boolean | undefined} isPremium - Является ли премиумом?
 */
export interface IOffer {
  id: number;
  title: string;
  type: PlacementTypes;
  previewImage: string;
  price: number;
  rating: number;
  city: ICity;
  location?: IMapPoint;
  inBookmarks?: boolean;
  isPremium?: boolean;
}
