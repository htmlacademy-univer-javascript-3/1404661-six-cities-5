import { render, screen } from '@testing-library/react';
import { Rating } from './Rating';

describe('Rating', () => {
  it('should render correctly with score and text', () => {
    render(<Rating score={4.5} hasText />);

    const ratingValueElement = screen.getByText('4.5');
    expect(ratingValueElement).toBeInTheDocument();
  });

  it('should render correctly without text', () => {
    render(<Rating score={3} hasText={false} />);

    const visuallyHiddenElement = screen.getByText(/Rating/i);
    expect(visuallyHiddenElement).toBeInTheDocument();

    const starsElement = screen.getByText(/Rating/i).previousSibling;
    expect(starsElement).toHaveStyle('width: 60%');
  });
});
