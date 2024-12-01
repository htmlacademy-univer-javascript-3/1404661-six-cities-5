/**
 * Роуты приложения.
 * @member {AppRoute.Main} - Главная страница.
 * @member {AppRoute.Login} - Страница авторизации.
 * @member {AppRoute.Favorites} - Страница избранного.
 * @member {AppRoute.Offer} - Страница предложения.
 */
export enum AppRoute {
  Main = '/',
  Login = '/login',
  Favorites = '/favorites',
  Offer = '/offer/:id'
}
