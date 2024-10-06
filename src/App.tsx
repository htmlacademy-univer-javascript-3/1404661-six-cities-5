import { FC } from 'react';

import { Main } from './pages/Main';

import { ICard } from './interfaces/components/card.interface';

/**
 * Интерфейс компонента приложения.
 * @prop {string} city - Город.
 * @prop {ICard[]} offers - Предложения.
 */
interface IApp {
  city: string;
  offers: ICard[];
}

/**
 * Компонент приложения.
 * @returns {JSX.Element}
 */
export const App: FC<IApp> = ({ city, offers }) => (<Main city={city} offers={offers} />);
