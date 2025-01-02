import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import classNames from 'classnames';

import { CommentForm } from '../../components/organisms/comment-form/comment-form';
import { Map } from '../../components/organisms/map/map';
import { ReviewsList } from '../../components/molecules/reviews-list/reviews-list';
import { OffersList } from '../../components/molecules/offers-list/offers-list';
import { Header } from '../../components/molecules/header/header';
import { Spinner } from '../../components/atoms/spinner/spinner';
import { Rating } from '../../components/atoms/rating/rating';

import { IForm } from '../../interfaces/form.interface';
import { LoadingStatus } from '../../emuns/loading-statuses.enum';
import { Actions } from '../../emuns/actions.enum';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { createComment, fetchComments, fetchOffer, fetchOffersNearby } from '../../store/api-actions';
import { clearComments, clearNearbyOffers, clearOffer } from '../../store/actions';
import { convertToOffer } from '../../helpers/convert-to-offer.helper';

/**
 * Интерфейс компонента страницы предложения.
 * @prop {boolean} isAuthorized -  Авторизован ли пользователь?
 * @prop {(offerId: string, favoriteStatus?: boolean, offerPageId?: string) => void} onFavouriteClick - Функция добавления в избранное и удаление из избранного.
 */
interface IOfferProps {
  isAuthorized: boolean;
  onFavouriteClick: (offerId: string, favoriteStatus?: boolean, offerPageId?: string) => void;
}

/**
 * Компонент страницы предложения.
 * @param {IOfferProps} params - Входные парамтеры компонента.
 * @returns {JSX.Element}
 */
export const Offer: FC<IOfferProps> = ({ isAuthorized, onFavouriteClick }): JSX.Element => {

  const [isSendingError, setIsSendingError] = useState<boolean>(false);

  const { id } = useParams();

  const dispatch = useAppDispatch();

  const city = useAppSelector((state) => state[Actions.city].city);

  const offer = useAppSelector((state) => state[Actions.offer].offer);

  const isOfferDataLoading = useAppSelector((state) => state[Actions.offer].isOfferDataLoading);

  const nearOffers = useAppSelector((state) => state[Actions.offers].nearOffers).slice(0, 3);

  const isOffersDataLoading = useAppSelector((state) => state[Actions.offers].isOffersDataLoading);

  const reviews = useAppSelector((state) => state[Actions.comment].comments);

  const isCommentsDataLoading = useAppSelector((state) => state[Actions.comment].isCommentsDataLoading);

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

    dispatch(createComment({ offerId: String(offer.id), form })).catch(() => {
      setIsSendingError(true);

      setTimeout(() => {
        setIsSendingError(false);
      }, 5000);
    });

    if (!id) {
      return;
    }

    dispatch(fetchComments(id));
  }, [dispatch, id, offer]);

  /**
   * Обработчик нажатия на кнопку "To bookmark".
   * @param {React.MouseEvent<HTMLButtonElement>} event - Событие.
   * @returns void.
   */
  const handleFavouriteClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    onFavouriteClick(String(offer?.id), offer?.isFavorite);

    if (!id) {
      return;
    }

    dispatch(fetchOffer(id));
  };

  /**
   * Проверка кол-ва изображений.
   * @param {string[]} images - Изображения.
   * @returns {string[]}
   */
  const checkImages = (images: string[]): string[] => {
    if (images.length <= 6) {
      return images;
    }

    return images.slice(0, 5);
  };

  /**
   * Ближайшие предложения.
   */
  const nearOffersData = useMemo(() => isOffersDataLoading !== LoadingStatus.Success || !nearOffers ? (
    <Spinner />
  ) : (
    <OffersList offers={nearOffers} offerPage={String(offer?.id)} isNearPlaces />
  ), [isOffersDataLoading, nearOffers, offer]);

  if (!id || (isOfferDataLoading === LoadingStatus.Failure && !offer)) {
    return <Navigate to={'/404'} />;
  }

  return (
    <div className="page">
      <Header isAuthorized={isAuthorized} />
      <main className="page__main page__main--offer">
        <section className="offer" data-testid="offer-info">
          <div className="offer__gallery-container container" data-testid="offer-gallery">
            <div className="offer__gallery">
              {offer?.images && checkImages(offer?.images).map((image) => (
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
                  <button
                    className={classNames('offer__bookmark-button', 'button', offer?.isFavorite ? 'offer__bookmark-button--active' : '')}
                    type="button"
                    onClick={handleFavouriteClick}
                    data-testid="favourite-button"
                  >
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
                  {offer?.bedrooms === 1 ? `${offer?.bedrooms} Bedroom` : `${offer?.bedrooms} Bedrooms`}
                </li>
                <li className="offer__feature offer__feature--adults">
                  {offer?.maxAdults === 1 ? `Max ${offer?.maxAdults} adult` : `Max ${offer?.maxAdults} adults`}
                </li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">{offer?.price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <ul className="offer__inside-list">
                  {offer?.goods && offer?.goods.map((good) => (
                    <li className="offer__inside-item" key={good}>
                      {good}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="offer__host" data-testid="host-info">
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
              <section className="offer__reviews reviews" data-testid="reviews">
                {isCommentsDataLoading !== LoadingStatus.Success || !reviews ? (
                  <Spinner />
                ) : (
                  <ReviewsList reviews={reviews} />)}
                {isSendingError && <span style={{ color: 'red' }}>Oops, have some problem with sending comment</span>}
                {isAuthorized && <CommentForm onSubmit={onSubmit} />}
              </section>
            </div>
          </div>
          <section className="offer__map map" data-testid="map">
            {offer && <Map currentCity={city} offers={[...nearOffers, convertToOffer(offer)]} selectedOffer={offer} />}
          </section>
        </section>
        <div className="container">
          <section className="near-places places" data-testid="nearby-places">
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
