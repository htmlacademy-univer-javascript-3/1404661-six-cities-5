import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';

import { OfferCard } from './OfferCard';

import { IOffer } from '../../../interfaces/offer.interface';
import { PlacementTypes } from '../../../emuns/plecement-types.enum';

import { useAppDispatch, useAppSelector } from '../../../store/hooks';

vi.mock('../../../store/hooks', () => ({
  useAppDispatch: vi.fn(),
  useAppSelector: vi.fn(),
}));

vi.mock('../../atoms/Rating/Rating', () => ({
  Rating: () => <div data-testid="rating" />,
}));

describe('OfferCard', () => {
  const mockPlace: IOffer = {
    id: 1,
    title: 'Some place',
    type: PlacementTypes.Apartment,
    price: 120,
    rating: 4.5,
    city: { name: 'Paris', location: { latitude: 48.8566, longitude: 2.3522, zoom: 10 } },
    location: { latitude: 48.8566, longitude: 2.3522, zoom: 10 },
    isFavorite: true,
    isPremium: true,
    previewImage: 'img1.jpg',
  };

  it('should render OfferCard correctly with premium status', () => {
    const mockDispatch = vi.fn();
    (useAppDispatch as jest.Mock).mockReturnValue(mockDispatch);
    (useAppSelector as jest.Mock).mockReturnValue(true);

    render(
      <MemoryRouter>
        <OfferCard
          offer={mockPlace}
          onClick={vi.fn()}
        />
      </MemoryRouter>
    );

    expect(screen.getByText('Premium')).toBeInTheDocument();

    expect(screen.getByText(/€120/i)).toBeInTheDocument();
    expect(screen.getByText('apartment')).toBeInTheDocument();

    expect(screen.getByText('Some place')).toBeInTheDocument();

    const image = screen.getByAltText('Place image');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'img1.jpg');
    expect(image).toHaveAttribute('width', '260');
    expect(image).toHaveAttribute('height', '200');
  });

  it('should call onMouseOver and onMouseLeave correctly', () => {
    const onMouseOverMock = vi.fn();
    const onMouseLeaveMock = vi.fn();

    render(
      <MemoryRouter>
        <OfferCard
          offer={mockPlace}
          onClick={vi.fn()}
          onMouseEnter={onMouseOverMock}
          onMouseLeave={onMouseLeaveMock}
        />
      </MemoryRouter>
    );

    const card = screen.getByText('Some place').closest('article');
    fireEvent.mouseOver(card!);
    fireEvent.mouseLeave(card!);

    expect(onMouseOverMock).toHaveBeenCalledTimes(1);
    expect(onMouseOverMock).toHaveBeenCalledWith(expect.anything());
    expect(onMouseLeaveMock).toHaveBeenCalledTimes(1);
    expect(onMouseLeaveMock).toHaveBeenCalledWith(expect.anything());
  });

  it('should call onClick correctly', () => {
    const mockOnClick = vi.fn();

    render(
      <MemoryRouter>
        <OfferCard
          offer={mockPlace}
          onClick={mockOnClick}
        />
      </MemoryRouter>
    );

    const bookmarkButton = screen.getByRole('button', { name: /To bookmarks/i });

    fireEvent.click(bookmarkButton);

    expect(mockOnClick).toHaveBeenCalledTimes(1);
    expect(mockOnClick).toHaveBeenCalledWith(String(mockPlace.id), mockPlace.isFavorite);

  });

  it('should not show bookmark button if user is not authorized', () => {
    (useAppSelector as jest.Mock).mockReturnValue(false);

    render(
      <MemoryRouter>
        <OfferCard
          offer={mockPlace}
          onClick={vi.fn()}
        />
      </MemoryRouter>
    );

    expect(screen.queryByRole('button', { name: /To bookmarks/i })).not.toBeInTheDocument();
  });
});
