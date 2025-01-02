import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';

import { ReviewItem } from './review-item';

import { IComment } from '../../../interfaces/comment.interface';

import * as dateUtils from '../../../helpers/convert-dates.helper';

vi.mock('../rating/rating', () => ({
  Rating: () => <div data-testid="rating" />,
}));

vi.mock('../../../helpers/convert-dates.helper', () => ({
  convertDateToYearMonthDay: vi.fn(),
  convertDateToMonthWordYear: vi.fn(),
}));

describe('ReviewItem', () => {
  const mockReview: IComment = {
    id: 1,
    date: '2023-10-12T14:48:00.000Z',
    user: {
      name: 'John Doe',
      avatarUrl: '/path/to/avatar.jpg',
      isPro: false,
    },
    comment: 'Bathed in the nature. Completely unplugged. Unforgettable.',
    rating: 4.5,
  };

  it('should render ReviewItem correctly', () => {
    const dateToYearMonthDayMock = dateUtils.convertDateToYearMonthDay as jest.Mock;
    const dateToMonthWordYearMock = dateUtils.convertDateToMonthWordYear as jest.Mock;

    dateToYearMonthDayMock.mockReturnValue('2023-10-12');
    dateToMonthWordYearMock.mockReturnValue('October 2023');

    render(<ReviewItem comment={mockReview} />);

    const avatar = screen.getByAltText('Reviews avatar');
    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveAttribute('src', '/path/to/avatar.jpg');
    expect(avatar).toHaveAttribute('width', '54');
    expect(avatar).toHaveAttribute('height', '54');

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Bathed in the nature. Completely unplugged. Unforgettable.')).toBeInTheDocument();

    const timeElement = screen.getByText('October 2023');
    expect(timeElement).toBeInTheDocument();
    expect(timeElement).toHaveAttribute('dateTime', '2023-10-12');

    expect(screen.getByTestId('rating')).toBeInTheDocument();

    expect(dateToYearMonthDayMock).toHaveBeenCalledWith(new Date('2023-10-12T14:48:00.000Z'));
    expect(dateToMonthWordYearMock).toHaveBeenCalledWith(new Date('2023-10-12T14:48:00.000Z'));
  });
});
