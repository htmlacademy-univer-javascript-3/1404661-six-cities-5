import { IMapPoint } from './points.interface';

/**
 * @prop {string | undefined} title - Название.
 */
export interface ICity extends IMapPoint {
  title: string;
}
