import React from 'react';
import ReactDOM from 'react-dom/client';

import { App } from './App';

import { OFFERS } from './mocks/offers';
import { NEAR_BY_OFFERS } from './mocks/nearby-offers';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App offers={OFFERS} nearByOffers={NEAR_BY_OFFERS} />
  </React.StrictMode>
);
