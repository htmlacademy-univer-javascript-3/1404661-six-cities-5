import { render, screen } from '@testing-library/react';
import { useRef } from 'react';

import useMap from './use-map.tsx';

import { ICity } from '../interfaces/city.interface.ts';

import { CITIES } from '../constants/cities.ts';

const TestComponent = (city: ICity) => {
  const mapRef = useRef(null);
  const map = useMap(mapRef, city.location);

  return (
    <div>
      <div ref={mapRef} />
      {map ? null : <p>Карта не инициализирована</p>}
    </div>
  );
};

export default TestComponent;

describe('useMap', () => {

  it('should render useMap correctly', () => {
    const notExpectedText = 'Карта не инициализирована';

    render(<TestComponent {...CITIES.Paris} />);

    const textElement = screen.queryByText(notExpectedText);
    expect(textElement).not.toBeInTheDocument();
  });
});
