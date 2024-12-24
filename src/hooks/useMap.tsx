import { useEffect, useState, MutableRefObject, useRef } from 'react';
import { LatLng, Map, TileLayer } from 'leaflet';

import { IMapPoint } from '../interfaces/points.interface';

/**
 * Хук для инициализации и управления экземпляром карты Leaflet.
 * @param {MutableRefObject<HTMLElement | null>} mapRef - Реф элемента карты.
 * @param {IMapPoint} mapPoint - Точка на карте.
 * @returns {Map | null}
 */
function useMap(
  mapRef: MutableRefObject<HTMLElement | null>,
  mapPoint: IMapPoint
): Map | null {
  const [map, setMap] = useState<Map | null>(null);

  const isRenderedRef = useRef<boolean>(false);

  useEffect(() => {
    if (mapRef.current !== null && !isRenderedRef.current) {
      const instance = new Map(mapRef.current, {
        center: {
          lat: mapPoint.latitude,
          lng: mapPoint.longitude,
        },
        zoom: mapPoint.zoom
      });

      const layer = new TileLayer(
        'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
        {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        }
      );

      instance.addLayer(layer);

      setMap(instance);
      isRenderedRef.current = true;
    } else if (isRenderedRef.current) {
      map?.panTo(new LatLng(mapPoint.latitude, mapPoint.longitude));
    }
  }, [mapRef, mapPoint, map]);

  return map;
}

export default useMap;
