import React from 'react';
import ReactDOM from 'react-dom/client';

import { App } from './App';

import { PLACEMENTS, CITY } from './mock/placements';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App offers={PLACEMENTS} city={CITY} />
  </React.StrictMode>
);
