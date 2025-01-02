import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';

import { CityList } from './city-list';

import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { changeCity } from '../../../store/actions';
import { CITIES } from '../../../constants/cities';

vi.mock('../../../store/hooks', () => ({
  useAppDispatch: vi.fn(),
  useAppSelector: vi.fn(),
}));

describe('CityList', () => {
  it('should render CityList correctly and handle city click', () => {
    const mockDispatch = vi.fn();
    (useAppDispatch as jest.Mock).mockReturnValue(mockDispatch);

    const mockCurrentCity = { name: 'Paris', location: { latitude: 48.8566, longitude: 2.3522 } };
    (useAppSelector as jest.Mock).mockReturnValue(mockCurrentCity);

    render(<CityList />);

    const cityElements = screen.getAllByRole('listitem');
    expect(cityElements).toHaveLength(Object.keys(CITIES).length);

    const activeCity = screen.getByText('Paris');
    expect(activeCity).toBeInTheDocument();
    expect(activeCity.parentElement).toHaveClass('tabs__item--active');

    const cityToClick = screen.getByText('Hamburg');
    cityToClick.click();
    expect(mockDispatch).toHaveBeenCalledWith(changeCity(CITIES['Hamburg']));
  });
});