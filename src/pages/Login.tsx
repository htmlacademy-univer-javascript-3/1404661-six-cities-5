import { FC, FormEventHandler } from 'react';
import { Navigate } from 'react-router-dom';

import { Header } from '../components/molecules/Header/Header';

import { ILogin } from '../interfaces/login.interface';
import { AppRoute } from '../emuns/app-route.emun';

import { userLogin } from '../store/api-actions';
import { useAppDispatch, useAppSelector } from '../store/hooks';

/**
 * Компонент страницы логина.
 * @returns {JSX.Element}
 */
export const Login: FC = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const isAuthorized = useAppSelector((state) => state.authorizationStatus);

  /**
   * Отправка данных формы авторизации.
   * @param event
   * @return void
   */
  const handleSubmit: FormEventHandler = (event): void => {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);

    const email = formData.get('email');

    const password = formData.get('password');

    if (email && password) {
      const user = {
        email: email,
        password: password
      };

      dispatch(userLogin(user as ILogin));
    }
  };

  if (isAuthorized) {
    return <Navigate to={AppRoute.Main} />;
  }

  return (
    <div className="page page--gray page--login">
      <Header />

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form
              className="login__form form"
              method="post"
              onSubmit={handleSubmit}
            >
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input className="login__input form__input" type="email" name="email" placeholder="Email" required />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input className="login__input form__input" type="password" name="password" placeholder="Password" required />
              </div>
              <button className="login__submit form__submit button" type="submit">Sign in</button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <a className="locations__item-link" href="#">
                <span>Paris</span>
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};
