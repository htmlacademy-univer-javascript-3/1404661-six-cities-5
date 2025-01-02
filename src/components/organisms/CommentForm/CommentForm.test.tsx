import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';

import CommentForm from './CommentForm';

type ICommentRatingProps = {
  onChange: (field: string, value: number) => void;
};

vi.mock('../Rating/ReviewRating', () => ({
  ReviewRating: ({ onChange }: ICommentRatingProps) => (
    <div data-testid="rating">
      <button onClick={() => onChange('rating', 4)}>Set Rating</button>
    </div>
  ),
}));

describe('CommentForm', () => {
  it('should render CommentForm correctly', () => {
    render(<CommentForm onSubmit={vi.fn()} />);

    expect(screen.getByLabelText(/Your review/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Tell how was your stay/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Submit/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Submit/i })).toBeDisabled();
  });
});
