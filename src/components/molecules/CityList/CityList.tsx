import { CITIES } from '../../../constants/cities';
import { changeCity } from '../../../store/actions';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';

/**
 * Компонент списка городов.
 * @returns {JSX.Element}
 */
export const CityList = (): JSX.Element => {

  const currentCity = useAppSelector((state) => state.city);

  const dispatch = useAppDispatch();

  return (
    <ul className="locations__list tabs__list">
      {
        Object.entries(CITIES).map(([key, item]) => (
          <li key={key} className="locations__item">
            <a className={`locations__item-link tabs__item ${(item.title === currentCity.title) ? 'tabs__item--active' : null}`}
              href="#"
              onClick={() => dispatch(changeCity(item))}
            >
              <span>{item.title}</span>
            </a>
          </li>
        ))
      }
    </ul>
  );
};
