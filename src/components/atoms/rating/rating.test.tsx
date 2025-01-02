import { render, screen } from '@testing-library/react';
import { Rating } from './rating';

describe('Rating', () => {
  it('should render Rating correctly with score and text', () => {
    render(<Rating score={4.5} hasText />);

    const ratingValueElement = screen.getByText('4.5');
    expect(ratingValueElement).toBeInTheDocument();
  });

  it('should render Rating correctly without text', () => {
    render(<Rating score={3} hasText={false} />);

    const visuallyHiddenElement = screen.getByText(/Rating/i);
    expect(visuallyHiddenElement).toBeInTheDocument();

    const starsElement = screen.getByText(/Rating/i).previousSibling;
    expect(starsElement).toHaveStyle('width: 60%');
  });
});
