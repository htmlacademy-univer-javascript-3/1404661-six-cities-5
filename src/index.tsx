import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import { App } from './App';

import { fetchOffers, userCheckAuth } from './store/api-actions.ts';
import { store } from './store';

(function initApp() {
  store.dispatch(userCheckAuth());
  store.dispatch(fetchOffers());
})();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
