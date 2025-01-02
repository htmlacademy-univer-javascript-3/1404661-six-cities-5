import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Login } from './Login';

import { withHistory, withStore } from '../../utils/mock-components';

describe('Login', () => {

  it('should render "Login" page correctly', () => {
    const emailText = 'E-mail';
    const passwordText = 'Password';

    const { withStoreComponent } = withStore(<Login isAuthorized={false} />, {});
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    const button = screen.getByRole('button');

    expect(button).toBeInTheDocument();
    expect(screen.getByText(emailText)).toBeInTheDocument();
    expect(screen.getByText(passwordText)).toBeInTheDocument();
  });

  it('should render correctly when user enter login and password', async () => {
    const emailElementTestId = 'emailElement';
    const passwordElementTestId = 'passwordElement';

    const expectedEmailValue = 'qwerty@mail.ru';
    const expectedPasswordValue = 'qwe123rty456';


    const { withStoreComponent } = withStore(<Login isAuthorized={false} />, {});
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    await userEvent.type(
      screen.getByTestId(emailElementTestId),
      expectedEmailValue
    );

    await userEvent.type(
      screen.getByTestId(passwordElementTestId),
      expectedPasswordValue
    );

    expect(screen.getByDisplayValue(expectedEmailValue)).toBeInTheDocument();
    expect(screen.getByDisplayValue(expectedPasswordValue)).toBeInTheDocument();
  });
});
