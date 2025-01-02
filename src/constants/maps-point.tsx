import { Icon } from 'leaflet';

/**
 * Иконка по умолчанию.
 */
export const DEFAULT_ICON = new Icon({
  iconUrl: '../../public/img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

/**
 * Иконка активного предложения.
 */
export const CURRENT_ICON = new Icon({
  iconUrl: '../../public/img/pin-active.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});
