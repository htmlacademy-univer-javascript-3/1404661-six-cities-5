/**
 * Интерфейс пользователя.
 * @prop {string} avatar- Аватар.
 * @prop {string} name - Имя.
 */
export interface IUser {
  avatarUrl: string;
  name: string;
  isPro: boolean;
}

/**
 * Интерфейс пользователя с дополнительной информацией.
 * @prop {string} email - Почта.
 * @prop {string} token - Токен.
 */
export interface IUserFull extends IUser {
  email: string;
  token: string;
}
