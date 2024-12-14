/**
 * Интерфейс точки на карте.
 * @prop {number} latitude - Широта.
 * @prop {number} longitude - Долгота.
 * @prop {string | undefined} title - Название.
 */
export interface IMapPoint {
  latitude: number;
  longitude: number;
  title?: string;
}
