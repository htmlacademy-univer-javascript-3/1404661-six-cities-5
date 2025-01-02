import { IOfferFull } from '../interfaces/offer-full.interface';
import { IOffer } from '../interfaces/offer.interface';

/**
 * Преобразует объект предожения к короткой форме.
 * @param {IOfferFull} offerFull
 * @returns {IOffer}
 */
export const convertToOffer = (offerFull: IOfferFull): IOffer => {
  const {
    id,
    title,
    type,
    previewImage,
    price,
    rating,
    city,
    location,
    isFavorite,
    isPremium,
  } = offerFull;

  return {
    id,
    title,
    type,
    previewImage,
    price,
    rating,
    city,
    location,
    isFavorite,
    isPremium,
  };
};
