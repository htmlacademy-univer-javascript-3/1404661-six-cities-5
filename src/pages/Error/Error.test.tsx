import { render, screen } from '@testing-library/react';

import { Error } from './Error';

import { withHistory } from '../../utils/mock-components';

describe('Error', () => {

  it('should render "Error" page correctly', () => {
    const expectedHeaderText = '404 Not Found';
    const expectedLinkText = 'Return to main page';

    render(withHistory(<Error />));

    expect(screen.getByText(expectedHeaderText)).toBeInTheDocument();
    expect(screen.getByText(expectedLinkText)).toBeInTheDocument();
  });
});
