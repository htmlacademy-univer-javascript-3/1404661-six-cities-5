import { FC, useEffect, useRef } from 'react';
import { layerGroup, Marker } from 'leaflet';
import 'leaflet/dist/leaflet.css';

import { IOffer } from '../../../interfaces/offer.interface';
import { ICity } from '../../../interfaces/city.interface';
import { IOfferFull } from '../../../interfaces/offer-full.interface';

import useMap from '../../../hooks/use-map';
import { CURRENT_ICON, DEFAULT_ICON } from '../../../constants/maps-point';

/**
 * Интерфейс компонента карты.
 * @prop {ICity} currentCity - Текущий город.
 * @prop {IOffer[]} offers - Пердложения.
 * @prop {IOffer | IOfferFull | null | undefined} selectedOffer - Выбранное предложение.
 */
interface IMapProps {
  currentCity: ICity;
  offers: IOffer[];
  selectedOffer?: IOffer | IOfferFull | null;
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

  const map = useMap(mapRef, currentCity && currentCity.location);


  /* Эффектит установку иконок на карте. */
  useEffect(() => {
    if (map) {
      const markerLayer = layerGroup().addTo(map);

      offers.forEach((offer) => {
        const marker = new Marker({
          lat: offer?.location?.latitude ?? 0,
          lng: offer?.location?.longitude ?? 0
        });

        marker
          .setIcon(
            selectedOffer && selectedOffer.id === offer.id
              ? CURRENT_ICON
              : DEFAULT_ICON
          )
          .addTo(markerLayer);
      });

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, offers, selectedOffer, currentCity]);

  return <div style={{ height: '500px' }} ref={mapRef} data-testid='map-test'></div>;
};
