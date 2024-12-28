import { FC } from 'react';

/**
 * Интерфейс компонента рейтинга.
 * @prop {number | undefined} score - Рейтинг.
 * @prop {boolean | undefined} hasText - Есть ли текст?
 */
interface IRatingProps {
  score?: number;
  hasText?: boolean;
}

/**
 * Компонент рейтинга.
 * @param {IRatingProps} param - Входные параметры компонента.
 * @returns {React.FC}
 */
export const Rating: FC<IRatingProps> = ({ score, hasText = true }) => {

  if (!score) {
    return;
  }

  return (
    <div className="offer__rating rating">
      <div className="offer__stars rating__stars">
        <span style={{ 'width': `${Math.floor(score + 0.5) * 20}%` }}></span>
        <span className="visually-hidden">Rating</span>
      </div>
      {hasText && (
        <span className="offer__rating-value rating__value">{score}</span>
      )}
    </div>
  );
};
