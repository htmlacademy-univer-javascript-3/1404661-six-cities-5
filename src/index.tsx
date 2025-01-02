import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { App } from './app.tsx';

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
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
