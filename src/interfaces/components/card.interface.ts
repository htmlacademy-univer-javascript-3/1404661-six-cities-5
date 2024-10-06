import { PlacementTypes } from '../../emuns/plecement-types.enum';

/**
 * Интерфейс компонента карточки.
 * @prop {number} id - Идентификатор.
 * @prop {string} title - Заголовок.
 * @prop {string} type - Тип.
 * @prop {string} image - Изображение.
 * @prop {string | undefined} isPremium - Является ли премиумом?
 */
export interface ICard {
  id: number;
  title: string;
  type: PlacementTypes;
  image: string;
  price: number;
  rating: number;
  inBookmarks?: boolean;
  isPremium?: boolean;
}
