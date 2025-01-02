import { useState, useLayoutEffect, FC } from 'react';
import { Router } from 'react-router-dom';
import type { BrowserHistory } from 'history';

/**
 * Интерфейс свойств для компонента маршрутизатора с поддержкой кастомной истории.
 * @prop {BrowserHistory} history - Объект истории для управления навигацией.
 * @prop {string | undefined} basename - Базовый URL для маршрутов.
 * @prop {React.ReactNode | undefined} children - Дочерние компоненты.
 */
export interface IHistoryRouterProps {
  history: BrowserHistory;
  basename?: string;
  children?: React.ReactNode;
}

/**
 * Компонент маршрутизатора с поддержкой кастомной истории.
 * @param {IHistoryRouterProps} param0 - Входные праметры компонента.
 * @returns {JSX.Element}
 */
export const HistoryRouter: FC<IHistoryRouterProps> = ({
  basename,
  children,
  history,
}) => {
  const [state, setState] = useState({
    action: history.action,
    location: history.location,
  });

  useLayoutEffect(() => history.listen(setState), [history]);

  return (
    <Router
      basename={basename}
      location={state.location}
      navigationType={state.action}
      navigator={history}
    >
      {children}
    </Router>
  );
};
