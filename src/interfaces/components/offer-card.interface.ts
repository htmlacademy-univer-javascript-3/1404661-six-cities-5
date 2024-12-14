import { PlacementTypes } from '../../emuns/plecement-types.enum';
import { IMapPoint } from '../points.interface';

/**
 * Интерфейс компонента карточки.
 * @prop {number} id - Идентификатор.
 * @prop {string} title - Заголовок.
 * @prop {string} type - Тип.
 * @prop {string} image - Изображение.
 * @prop {number} price - Цена.
 * @prop {number} rating - Рейтинг.
 * @prop {IMapPoint | undefined} coordinates - Координаты.
 * @prop {boolean | undefined} inBookmarks - Есть ли в заметках?
 * @prop {boolean | undefined} isPremium - Является ли премиумом?
 */
export interface IOfferCard {
  id: number;
  title: string;
  type: PlacementTypes;
  image: string;
  price: number;
  rating: number;
  coordinates?: IMapPoint;
  inBookmarks?: boolean;
  isPremium?: boolean;
}
