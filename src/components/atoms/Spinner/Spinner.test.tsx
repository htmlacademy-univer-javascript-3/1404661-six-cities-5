import { render } from '@testing-library/react';
import { Spinner } from './Spinner';

describe('Spinner', () => {
  it('renders the spinner container and spinner element', () => {
    const { container } = render(<Spinner />);

    const spinnerContainer = container.querySelector('.spinner-container');
    expect(spinnerContainer).toBeInTheDocument();

    const spinner = spinnerContainer?.querySelector('.spinner');
    expect(spinner).toBeInTheDocument();
  });
});
