import { IUser } from './user.inretface';

/**
 * Интерфейс отзывова.
 * @prop {number} id- Изображение
 * @prop {IUser} user - Пользователь.
 * @prop {number} rating - Рейтинг.
 * @prop {string} comment - Комментарий.
 * @prop {string} date - Дата.
 */
export interface IComment {
  id: number;
  user: IUser;
  rating: number;
  comment: string;
  date: string;
}
