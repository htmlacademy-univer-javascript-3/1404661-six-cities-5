import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';

import { CommentForm } from '../components/organisms/CommentForm/CommentForm';
import { Map } from '../components/organisms/Map/Map';
import { ReviewsList } from '../components/molecules/ReviewsList/ReviewsList';
import { OffersList } from '../components/molecules/OffersList/OffersList';
import { Header } from '../components/molecules/Header/Header';
import { Spinner } from '../components/atoms/Spinner/Spinner';
import { Rating } from '../components/atoms/Rating/Rating';

import { IOffer } from '../interfaces/offer.interface';
import { IForm } from '../interfaces/form.interface';
import { LoadingStatus } from '../emuns/statuses.enum';
import { Actions } from '../emuns/actions.enum';

import { useAppDispatch, useAppSelector } from '../store/hooks';
import { changeFavorite, createComment, fetchComments, fetchOffer, fetchOffersNearby } from '../store/api-actions';
import { clearComments, clearNearbyOffers, clearOffer } from '../store/actions';
import classNames from 'classnames';

/**
 * Компонент страницы предложения.
 * @param {IOfferProps} params - Входные парамтеры компонента.
 * @returns {JSX.Element}
 */
export const Offer: FC = (): JSX.Element => {
  const [selectedOffer, setSelectedPoint] = useState<IOffer | null>(null);

  const { id } = useParams();

  const dispatch = useAppDispatch();

  const isAuthorized = useAppSelector((state) => state[Actions.user].authorizationStatus);

  const city = useAppSelector((state) => state[Actions.city].city);

  const offer = useAppSelector((state) => state[Actions.offer].offer);

  const isOfferDataLoading = useAppSelector((state) => state[Actions.offer].isOfferDataLoading);

  const nearOffers = useAppSelector((state) => state[Actions.offers].nearOffers);

  const isOffersDataLoading = useAppSelector((state) => state[Actions.offers].isOffersDataLoading);

  const reviews = useAppSelector((state) => state[Actions.comment].comments);

  const isCommentsDataLoading = useAppSelector((state) => state[Actions.comment].isCommentsDataLoading);

  /**
  * Дабавление в изабранное.
  */
  const onFavoriteClick = () => {
    dispatch(
      changeFavorite({
        offerId: String(id),
        favoriteStatus: !offer?.isFavorite,
      }),
    ).then(() => {
      if (!id) {
        return;
      }

      dispatch(fetchOffer(id));
    });
  };

  /**
   * Эффектит загрузку данных предложения.
   */
  useEffect(() => {
    if (!id) {
      return;
    }

    dispatch(fetchOffer(id));

    return () => {
      dispatch(clearOffer());
    };
  }, [dispatch, id]);

  /**
   * Эффектит загрузку ближайших мест и комментариев.
   */
  useEffect(() => {
    if (!id || !offer) {
      return;
    }
    dispatch(fetchComments(id));
    dispatch(fetchOffersNearby(id));

    return () => {
      dispatch(clearComments());
      dispatch(clearNearbyOffers());
    };
  }, [dispatch, id, offer]);

  /**
   * Отправка формы комментария.
   */
  const onSubmit = useCallback((form: IForm) => {
    if (!form || !offer) {
      return;
    }

    dispatch(createComment({ offerId: String(offer.id), form }));

    if (!id) {
      return;
    }

    dispatch(fetchComments(id));
  }, [dispatch, id, offer]);

  /**
   * Обработчик клика на предложение.
   * @param {IOffer} selectItem - Выбранное предложение.
   * @returns void.
   */
  const onClickOffer = (selectItem: IOffer | null) => {
    setSelectedPoint(selectItem);
  };

  /**
   * Ближайшие предложения.
   */
  const nearOffersData = useMemo(() => isOffersDataLoading !== LoadingStatus.Success || !nearOffers ? (
    <Spinner />
  ) : (
    <OffersList offers={nearOffers} selectOffer={onClickOffer} offerPage={String(offer?.id)} isNearPlaces />
  ), [isOffersDataLoading, nearOffers, offer]);

  if (!id || (isOfferDataLoading === LoadingStatus.Failure && !offer)) {
    return <Navigate to={'/404'} />;
  }

  return (
    <div className="page">
      <Header />
      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {offer?.images?.map((image) => (
                <div className="offer__image-wrapper" key={image}>
                  <img className="offer__image" src={image} alt="Photo studio" />
                </div>
              ))}
            </div>
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">
              {offer?.isPremium && (
                <div className="offer__mark">
                  <span>Premium</span>
                </div>
              )}
              <div className="offer__name-wrapper">
                <h1 className="offer__name">
                  {offer?.title}
                </h1>
                {isAuthorized &&
                  <button className={classNames('offer__bookmark-button', 'button', offer?.isFavorite ? 'offer__bookmark-button--active' : '')} type="button" onClick={onFavoriteClick}>
                    <svg className="offer__bookmark-icon" width="31" height="33">
                      <use xlinkHref="#icon-bookmark"></use>
                    </svg>
                    <span className="visually-hidden">To bookmarks</span>
                  </button>}
              </div>
              <Rating score={offer?.rating} />
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">
                  {offer?.type}
                </li>
                <li className="offer__feature offer__feature--bedrooms">
                  {offer?.bedrooms} Bedrooms
                </li>
                <li className="offer__feature offer__feature--adults">
                  Max {offer?.maxAdults} adults
                </li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">{offer?.price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <ul className="offer__inside-list">
                  {offer?.goods.map((good) => (
                    <li className="offer__inside-item" key={good}>
                      {good}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
                    <img className="offer__avatar user__avatar" src={offer?.host.avatarUrl} width="74" height="74" alt="Host avatar" />
                  </div>
                  <span className="offer__user-name">
                    {offer?.host.name}
                  </span>
                  <span className="offer__user-status">
                    {offer?.host.isPro && (
                      <span className="offer__user-status">Pro</span>
                    )}
                  </span>
                </div>
                <div className="offer__description">
                  <p className="offer__text">{offer?.description}</p>
                </div>
              </div>
              <section className="offer__reviews reviews">
                {isCommentsDataLoading !== LoadingStatus.Success || !reviews ? (
                  <Spinner />
                ) : (
                  <ReviewsList reviews={reviews} />)}
                {isAuthorized && <CommentForm onSubmit={onSubmit} />}
              </section>
            </div>
          </div>
          <section className="offer__map map">
            <Map currentCity={city} offers={nearOffers} selectedOffer={selectedOffer} />
          </section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <div className="near-places__list places__list">
              {nearOffersData}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};
