import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';

import { ReviewsList } from './reviews-list';

import { IComment } from '../../../interfaces/comment.interface';

interface ICommentProps {
  comment: IComment;
}

vi.mock('../../atoms/review-item/review-item', () => ({
  ReviewItem: ({ comment }: ICommentProps) => (
    <li data-testid="review-item">
      {comment.comment}
    </li>
  ),
}));

describe('ReviewsList', () => {
  const mockReviews: IComment[] = [
    {
      id: 1,
      date: '2023-10-12T14:48:00.000Z',
      user: {
        name: 'John Doe',
        avatarUrl: '/path/to/avatar.jpg',
        isPro: false,
      },
      comment: '1 - Bathed in the nature. Completely unplugged. Unforgettable.',
      rating: 4,
    },
    {
      id: 2,
      date: '2023-10-13T14:48:00.000Z',
      user: {
        name: 'Jane Smith',
        avatarUrl: '/path/to/avatar2.jpg',
        isPro: true,
      },
      comment: '2 - Bathed in the nature. Completely unplugged. Unforgettable.',
      rating: 3,
    },
  ];

  it('should render correctly with reviews', () => {
    render(<ReviewsList reviews={mockReviews} />);

    expect(screen.getByText('Reviews ·')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();

    const reviewItems = screen.getAllByTestId('review-item');
    expect(reviewItems).toHaveLength(mockReviews.length);

    expect(screen.getByText('1 - Bathed in the nature. Completely unplugged. Unforgettable.')).toBeInTheDocument();
    expect(screen.getByText('2 - Bathed in the nature. Completely unplugged. Unforgettable.')).toBeInTheDocument();
  });

  it('should render correctly with no reviews', () => {
    render(<ReviewsList reviews={[]} />);

    expect(screen.getByText('Reviews ·')).toBeInTheDocument();
    expect(screen.getByText('0')).toBeInTheDocument();

    expect(screen.queryByTestId('review-item')).not.toBeInTheDocument();
  });
});
