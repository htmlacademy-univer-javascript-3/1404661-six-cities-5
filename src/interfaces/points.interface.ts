/**
 * Интерфейс точки на карте.
 * @prop {number} latitude - Широта.
 * @prop {number} longitude - Долгота.
 * @prop {number} zoom - Увеличение.
 */
export interface IMapPoint {
  latitude: number;
  longitude: number;
  zoom: number;
}
