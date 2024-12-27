import { IMapPoint } from './points.interface';

/**
 * Интерфейс города.
 * @prop {IMapPoint} location - Координаты.
 * @prop {string} name - Название.
 */
export interface ICity {
  location: IMapPoint;
  name: string;
}
