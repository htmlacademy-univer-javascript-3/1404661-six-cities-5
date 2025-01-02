import { FC, useState } from 'react';

import { FilterTypes } from '../../../constants/filters';

/**
 * Интерфейс компонента фильтра.
 * @prop {FilterTypes} currentFilter - Текущий фильтр.
 * @prop {(filter: FilterTypes) => void} onChange - Функция изменение фильтра.
 */
interface IFilterProps {
  currentFilter: FilterTypes;
  onChange: (filter: FilterTypes) => void;
}

/**
 * Компонент фильтра.
 * @param {IFilterProps} params - Входные параметры компонента.
 * @returns {JSX.Element}
 */
export const Filter: FC<IFilterProps> = ({ currentFilter, onChange }): JSX.Element => {

  const [isActive, setActive] = useState(false);

  return (
    <form className="places__sorting" action="#" method="get" data-testid='filter-form'>
      <span className="places__sorting-caption">Sort by </span>
      <span className="places__sorting-type" tabIndex={0}
        onClick={() => setActive((active) => !active)}
      >
        {currentFilter}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select" />
        </svg>
      </span>
      <ul className={`places__options places__options--custom ${isActive ? 'places__options--opened' : null}`}>
        {Object.values(FilterTypes).map((filter) => (
          <li key={filter}
            className={`places__option ${filter === currentFilter ? 'places__option--active' : null}`}
            tabIndex={0}
            onClick={() => onChange(filter)}
          >
            {filter}
          </li>
        ))}
      </ul>
    </form>
  );
};
