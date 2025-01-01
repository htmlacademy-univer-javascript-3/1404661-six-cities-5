import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';

import { ReviewItem } from './ReviewItem';

import { IComment } from '../../../interfaces/comment.interface';

import * as dateUtils from '../../../helpers/dates';

vi.mock('../Rating/Rating', () => ({
  Rating: () => <div data-testid="rating" />,
}));

vi.mock('../../../helpers/dates', () => ({
  dateToYearMonthDay: vi.fn(),
  dateToMonthWordYear: vi.fn(),
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

  it('should render correctly', () => {
    const dateToYearMonthDayMock = dateUtils.dateToYearMonthDay as jest.Mock;
    const dateToMonthWordYearMock = dateUtils.dateToMonthWordYear as jest.Mock;

    dateToYearMonthDayMock.mockReturnValue('2023-10-12');
    dateToMonthWordYearMock.mockReturnValue('October 2023');

    render(<ReviewItem {...mockReview} />);

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
