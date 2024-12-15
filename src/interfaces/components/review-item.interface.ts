import { IUser } from '../user.inretface';

/**
 * Интерфейс списка отзывов.
 * @prop {number} id- Изображение
 * @prop {IUser} user - Пользователь.
 * @prop {number} rating - Рейтинг.
 * @prop {string} comment - Комментарий.
 * @prop {string} date - Дата.
 */
export interface IReviewItem {
  id: number;
  user: IUser;
  rating: number;
  comment: string;
  date: string;
}
