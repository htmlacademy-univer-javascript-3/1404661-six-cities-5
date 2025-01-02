import { render, screen } from '@testing-library/react';

import { Logo } from './Logo';

import { withHistory } from '../../../utils/mock-components';

describe('Logo', () => {

  it('should render correctly', () => {
    const expectedImageAlt = '6 cities logo';
    const preparedComponent = withHistory(<Logo />);

    render(preparedComponent);

    expect(screen.getByAltText(expectedImageAlt)).toBeInTheDocument();
  });
});
