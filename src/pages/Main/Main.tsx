import { FC, useMemo, useState } from 'react';

import Map from '../../components/organisms/Map/Map';
import { Filter } from '../../components/organisms/Filter/Filter';
import { OffersList } from '../../components/molecules/OffersList/OffersList';
import { CityList } from '../../components/molecules/CityList/CityList';
import { Header } from '../../components/molecules/Header/Header';
import { Spinner } from '../../components/atoms/Spinner/Spinner';

import { IOffer } from '../../interfaces/components/offer.interface';

import { useAppSelector } from '../../store/hooks';
import { FilterTypes } from '../../constants/filters';

import './Main.css';

/**
 * Компонент главной страницы.
 * @returns {JSX.Element}
 */
export const Main: FC = (): JSX.Element => {

  const [selectedOffer, setSelectedPoint] = useState<IOffer | null>(null);

  const [currentFilter, setCurrentFilter] = useState<FilterTypes>(FilterTypes.popular);

  const currentCity = useAppSelector((state) => state.city);

  const currentOffers = useAppSelector((state) => state.offers);

  const isLoading = useAppSelector((state) => state.isOffersDataLoading);

  /**
   * Изменение фильра.
   * @param {FilterTypes} filter - Тип фильтра.
   */
  const onFilterChange = (filter: FilterTypes): void => {
    setCurrentFilter(filter);
  };

  /**
   * Сортированные предложения.
   */
  const sortedOffers = useMemo(() => {
    switch (currentFilter) {
      case FilterTypes.topRated:
        return currentOffers.toSorted((a, b) => b.rating - a.rating);
      case FilterTypes.highToLow:
        return currentOffers.toSorted((a, b) => b.price - a.price);
      case FilterTypes.lowToHigh:
        return currentOffers.toSorted((a, b) => a.price - b.price);
      default:
        return currentOffers;
    }
  }, [currentOffers, currentFilter]);

  /**
   * Обработчик клика на предложение.
   * @param {IOffer} selectItem - Выбранное предложение.
   * @returns void.
   */
  const onClickOffer = (selectItem: IOffer | null) => {
    setSelectedPoint(selectItem);
  };

  return (
    <div className="page page--gray page--main">
      <Header />
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <CityList />
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{currentOffers.filter((item) => item.city.name === currentCity.name)?.length} places to stay in {currentCity?.name}</b>
              <Filter currentFilter={currentFilter} onChange={onFilterChange} />
              {isLoading ? <Spinner /> : <OffersList offers={sortedOffers.filter((item) => item.city.name === currentCity.name)} selectOffer={onClickOffer} />}
            </section>
            <div className="cities__right-section">
              <section className="cities__map map">
                <Map currentCity={currentCity} offers={currentOffers.filter((item) => item.city.name === currentCity.name)} selectedOffer={selectedOffer} />
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
