import { FC, useEffect, useRef } from 'react';
import { layerGroup, Marker } from 'leaflet';
import 'leaflet/dist/leaflet.css';

import { IOffer } from '../../../interfaces/components/offer.interface';
import { ICity } from '../../../interfaces/city.interface';

import useMap from '../../../hooks/useMap';
import { currentCustomIcon, defaultCustomIcon } from '../../../constants/MapsPoint';

/**
 * Интерфейс компонента карты.
 * @prop {IMapPoint} currentCity - Текущий город.
 * @prop {IOfferCard[]} offers - Пердложения.
 * @prop {IOfferCard | null | undefined} selectedOffer - Выбранное предложение.
 */
interface IMapProps {
  currentCity: ICity;
  offers: IOffer[];
  selectedOffer?: IOffer | null;
}

/**
 * Компонент карты.
 * @param {IMapProps} params - Входные параметры компонента.
 * @returns {JSX.Element}
 */
export const Map: FC<IMapProps> = ({
  currentCity,
  offers,
  selectedOffer
}) => {
  const mapRef = useRef(null);

  const map = useMap(mapRef, currentCity);

  /* Эффектит установку иконок на карте. */
  useEffect(() => {
    if (map) {
      const markerLayer = layerGroup().addTo(map);
      offers.forEach((offer) => {
        const marker = new Marker({
          lat: offer?.coordinates?.latitude ?? 0,
          lng: offer?.coordinates?.longitude ?? 0
        });

        marker
          .setIcon(
            selectedOffer && selectedOffer.title === offer.title
              ? currentCustomIcon
              : defaultCustomIcon
          )
          .addTo(markerLayer);
      });

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, offers, selectedOffer, currentCity]);

  return <div style={{ height: '500px' }} ref={mapRef}></div>;
};

export default Map;
