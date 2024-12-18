import { CITIES } from '../../../constants/cities';
import { OFFERS } from '../../../mocks/offers';
import { setCity, setOffers } from '../../../store/actions';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';

/**
 * Компонент списка городов.
 * @returns
 */
export const CityList = () => {
  const currentCity = useAppSelector((state) => state.city);
  const dispatch = useAppDispatch();

  return (
    <ul className="locations__list tabs__list">
      {
        Object.entries(CITIES).map(([key, item]) => (
          <li key={key} className="locations__item">
            <a className={`locations__item-link tabs__item ${(item.title === currentCity.title) ? 'tabs__item--active' : null}`}
              href="#"
              onClick={() => {
                dispatch(setCity({ city: item }));
                dispatch(setOffers({ offers: OFFERS.filter((offer) => offer.city.title === item.title) }));
              }}
            >
              <span>{item.title}</span>
            </a>
          </li>
        ))
      }
    </ul>
  );
};
