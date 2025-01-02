import { FC, useMemo, useState } from 'react';

import { Map } from '../../components/organisms/map/map';
import { Filter } from '../../components/organisms/filter/filter';
import { OffersList } from '../../components/molecules/offers-list/offers-list';
import { CityList } from '../../components/molecules/city-list/city-list';
import { Header } from '../../components/molecules/header/header';
import { Spinner } from '../../components/atoms/spinner/spinner';

import { IOffer } from '../../interfaces/offer.interface';
import { LoadingStatus } from '../../emuns/loading-statuses.enum';
import { Actions } from '../../emuns/actions.enum';

import { useAppSelector } from '../../store/hooks';
import { FilterTypes } from '../../emuns/filter-types.enum';

import './main.css';

/**
 * Интерфейс компонента главной страницы.
 * @prop {boolean} isAuthorized -  Авторизован ли пользователь?
 */
interface IMainProps {
  isAuthorized: boolean;
}

/**
 * Компонент главной страницы.
 * @param {IMainProps} params - Входные параметры компонента.
 * @returns {JSX.Element}
 */
export const Main: FC<IMainProps> = ({ isAuthorized }): JSX.Element => {

  const [selectedOffer, setSelectedPoint] = useState<IOffer | null>(null);

  const [currentFilter, setCurrentFilter] = useState<FilterTypes>(FilterTypes.popular);

  const currentCity = useAppSelector((state) => state[Actions.city].city);

  const currentOffers = useAppSelector((state) => state[Actions.offers].offers);

  const isLoading = useAppSelector((state) => state[Actions.offers].isOffersDataLoading);

  /**
   * Изменение фильра.
   * @param {FilterTypes} filter - Тип фильтра.
   * @return {void}
   */
  const onFilterChange = (filter: FilterTypes): void => {
    setCurrentFilter(filter);
  };

  /** Предложения. */
  const offers = useMemo(() => currentOffers ? currentOffers.filter((item) => item.city.name === currentCity.name) : [], [currentCity, currentOffers]);

  /** Сортированные предложения. */
  const sortedOffers = useMemo(() => {
    switch (currentFilter) {
      case FilterTypes.topRated:
        return offers.toSorted((a, b) => b.rating - a.rating);
      case FilterTypes.highToLow:
        return offers.toSorted((a, b) => b.price - a.price);
      case FilterTypes.lowToHigh:
        return offers.toSorted((a, b) => a.price - b.price);
      default:
        return offers;
    }
  }, [offers, currentFilter]);

  /**
   * Обработчик клика на предложение.
   * @param {IOffer} selectItem - Выбранное предложение.
   * @returns void.
   */
  const onClickOffer = (selectItem: IOffer | null) => {
    setSelectedPoint(selectItem);
  };

  /**
   * Данные предложений.
   */
  const offersData = useMemo(() => isLoading !== LoadingStatus.Success ? <Spinner /> : <OffersList offers={sortedOffers} selectOffer={onClickOffer} />, [isLoading, sortedOffers]);

  return (
    <div className="page page--gray page--main">
      <Header isAuthorized={isAuthorized} />
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <CityList />
          </section>
        </div>
        <div className="cities">
          {
            ((isLoading === LoadingStatus.Failure || isLoading === LoadingStatus.Success) && sortedOffers.length === 0)
              ?
              (
                <div className="cities__places-container cities__places-container--empty container">
                  <section className="cities__no-places">
                    <div className="cities__status-wrapper tabs__content">
                      <b className="cities__status">No places to stay available</b>
                      <p className="cities__status-description">We could not find any property available at the moment in {currentCity ? currentCity.name : ''}</p>
                    </div>
                  </section>
                  <div className="cities__right-section"></div>
                </div>
              )
              :
              (
                <div className="cities__places-container container">
                  <section className="cities__places places">
                    <h2 className="visually-hidden">Places</h2>
                    <b className="places__found">{offers.length} places to stay in {currentCity ? currentCity.name : ''}</b>
                    <Filter currentFilter={currentFilter} onChange={onFilterChange} />
                    {offersData}
                  </section>
                  <div className="cities__right-section">
                    <section className="cities__map map">
                      <Map currentCity={currentCity} offers={offers} selectedOffer={selectedOffer} />
                    </section>
                  </div>
                </div>
              )
          }
        </div>
      </main>
    </div>
  );
};

export default Main;
