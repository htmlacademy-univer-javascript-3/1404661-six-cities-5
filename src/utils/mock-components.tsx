import { createMemoryHistory, MemoryHistory } from 'history';
import { HelmetProvider } from 'react-helmet-async';
import { configureMockStore, MockStore } from '@jedmao/redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import { Action } from 'redux';
import { Provider } from 'react-redux';

import { HistoryRouter } from './history-router';

import { createAPI } from '../api/axios-api';
import { AppThunkDispatch } from '../mocks/actions-store';
import { State } from '../store/state';

/**
 * Подключает возможность использовать зависимости роутинга в тестировании.
 * @param {JSX.Element} component - Компонент.
 * @param {MemoryHistory} history - Объект истории, используемый для управления историей навигации.
 * @returns {JSX.Element}
 */
export function withHistory(component: JSX.Element, history?: MemoryHistory) {
  const memoryHistory = history ?? createMemoryHistory();

  return (
    <HistoryRouter history={memoryHistory}>
      <HelmetProvider>
        {component}
      </HelmetProvider>
    </HistoryRouter>
  );
}

/**
 * Интерфейс для компонента, тестируемого с использованием мокового хранилища и адаптера.
 * @property {JSX.Element} withStoreComponent - Компонент, обернутый в провайдер хранилища для тестирования.
 * @property {MockStore} mockStore - Моковое хранилище для имитации состояния приложения в тестах.
 * @property {MockAdapter} mockAxiosAdapter - Моковый адаптер для имитации запросов через Axios.
 */
interface IComponentWithMockStore {
  withStoreComponent: JSX.Element;
  mockStore: MockStore;
  mockAxiosAdapter: MockAdapter;
}

/**
 * Подключает хранилище для тестируемых компонентов.
 * @param {JSX.Element} component - Тестируемый React-компонент, который будет обернут в провайдер хранилища.
 * @param {Partial<State>} initialState - Начальное состояние хранилища, которое будет использоваться во время тестирования.
 * @returns {IComponentWithMockStore} - Объект, содержащий компонент с подключенным хранилищем и моковое хранилище.
 */
export function withStore(
  component: JSX.Element,
  initialState: Partial<State> = {}
): IComponentWithMockStore {

  const axios = createAPI();

  const mockAxiosAdapter = new MockAdapter(axios);

  const middleware = [thunk.withExtraArgument(axios)];

  const mockStoreCreator = configureMockStore<State, Action<string>, AppThunkDispatch>(middleware);

  const mockStore = mockStoreCreator(initialState);

  return ({
    withStoreComponent: <Provider store={mockStore}>{component}</Provider>,
    mockStore,
    mockAxiosAdapter
  });
}
