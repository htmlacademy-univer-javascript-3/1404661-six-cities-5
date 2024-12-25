import React, { ChangeEvent, FormEvent } from 'react';
import { FC, useState } from 'react';

import { IForm } from '../../../interfaces/form.interface';

/**
 * Компонент формы создания комментария.
 * @returns {JSX.Element}
 */
export const CreateCommentForm: FC = (): JSX.Element => {
  const [form, setForm] = useState<IForm>({ review: '', rating: 0 });

  /** Звездочки. */
  const RATING = [0, 1, 2, 3, 4];

  /**
   * Обработчик изменения полей формы.
   * @param {ChangeEvent<HTMLInputElement | HTMLTextAreaElement>} event - Событие изменения поля формы.
   * @return void.
   */
  const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;

    if (name === 'review') {
      setForm((prev) => ({
        ...prev,
        review: value,
      }));
    }

    if (name === 'rating') {
      setForm((prev) => ({
        ...prev,
        rating: Number(value),
      }));
    }
  };

  /**
   * Обработчик отправки формы.
   * @param {FormEvent<HTMLFormElement>} event - Событие отправки формы.
   * @return void.
   */
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setForm({ review: form.review, rating: form.rating });
  };

  /**
   * Получение значения лейбла для поля.
   * @param {number} rating - Рейтинг.
   * @returns {string} - Лейбл.
   */
  const getLable = (rating: number): string => {
    switch (rating) {
      case 1:
        return 'terribly';
      case 2:
        return 'badly';
      case 3:
        return 'not bad';
      case 4:
        return 'good';
      case 5:
        return 'perfect';

      default:
        return 'perfect';
    }
  };

  return (
    <form className="reviews__form form" onSubmit={handleSubmit} action="#" method="post">
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {RATING.map((item) => {
          const rating = 5 - item;
          return (
            <React.Fragment key={rating}>
              <input
                className="form__rating-input visually-hidden"
                name="rating"
                value={rating}
                id={`${rating}-stars`}
                type="radio"
                onChange={handleInputChange}
                checked={form.rating === rating}
              />
              <label
                htmlFor={`${rating}-stars`}
                className="reviews__rating-label form__rating-label"
                title={getLable(rating)}
              >
                <svg className="form__star-image" width="37" height="33">
                  <use xlinkHref="#icon-star"></use>
                </svg>
              </label>
            </React.Fragment>
          );
        })}
      </div>
      <textarea className="reviews__textarea form__textarea" id="review" name="review" placeholder="Tell how was your stay, what you like and what can be improved" onChange={handleInputChange}></textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled={form.review.length < 50 || form.rating === 0} > Submit</button>
      </div>
    </form >
  );
};

export default CreateCommentForm;
