import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import { App } from './App';

import { FAVORITIES_OFFERS } from './mocks/favorities-offers';
import { fetchOffers } from './store/api-actions.ts';
import { store } from './store';

store.dispatch(fetchOffers());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App offers={FAVORITIES_OFFERS} />
    </Provider>
  </React.StrictMode>
);
