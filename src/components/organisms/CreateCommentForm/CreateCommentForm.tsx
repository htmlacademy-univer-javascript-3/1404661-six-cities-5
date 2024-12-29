import React, { FormEvent } from 'react';
import { FC, useState } from 'react';

import { IForm } from '../../../interfaces/form.interface';

/**
 * Интерфейс компонента формы создания комментария.
 * @prop {(form: IForm) => void} onSubmit - Функция отправки данных.
 */
interface ICreateCommentForm {
  onSubmit: (form: IForm) => void;
}

/**
 * Компонент формы создания комментария.
 * @param {ICreateCommentForm} params - Входные парамтеры компонента.
 * @returns {JSX.Element}
 */
export const CreateCommentForm: FC<ICreateCommentForm> = ({ onSubmit: submit }): JSX.Element => {
  const [form, setForm] = useState<IForm>({ comment: '', rating: 0 });

  /** Звездочки. */
  const RATING = [0, 1, 2, 3, 4];

  /**
   * Обработчик изменения полей формы.
   * @param {ChangeEvent<HTMLInputElement | HTMLTextAreaElement>} event - Событие изменения поля формы.
   * @return void.
   */
  const handleInputChange = (field: string, value: string | number) => {

    if (field === 'comment') {
      setForm((prev) => ({
        ...prev,
        [field]: String(value),
      }));
    }

    if (field === 'rating') {
      setForm((prev) => ({
        ...prev,
        [field]: Number(value),
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

    submit(form);

    setForm({ comment: '', rating: 0 });
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
    <form className="reviews__form form" onSubmit={handleSubmit} method="post">
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
                onChange={(e) => handleInputChange('rating', e.target.value)}
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
      <textarea className="reviews__textarea form__textarea" id="review" name="comment" placeholder="Tell how was your stay, what you like and what can be improved" onChange={(e) => handleInputChange('comment', e.target.value)}></textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled={form.comment.length < 50 || form.rating === 0}>
          Submit
        </button>
      </div>
    </form >
  );
};

export default CreateCommentForm;
