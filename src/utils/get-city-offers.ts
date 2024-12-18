import { IOffer } from '../interfaces/components/offer.interface';

import { OFFERS } from '../mocks/offers';
import { ICity } from '../interfaces/city.interface';

const getCityOffers = (city: ICity): IOffer[] => OFFERS.filter(
  (offer: IOffer) => offer.city.title === city.title
);

export default getCityOffers;
