import { FC, FormEventHandler } from 'react';
import { Link, Navigate } from 'react-router-dom';

import { ILogin } from '../../interfaces/login.interface';
import { AppRoute } from '../../emuns/app-route.emun';

import { userLogin } from '../../store/api-actions';
import { useAppDispatch } from '../../store/hooks';

/**
 * Интерфейс компонента страницы логина.
 * @prop {boolean} isAuthorized -  Авторизован ли пользователь?
 */
interface ILoginProps {
  isAuthorized: boolean;
}

/**
 * Компонент страницы логина.
 * @param {ILoginProps} params - Входные парамтеры компонента.
 * @returns {JSX.Element}
 */
export const Login: FC<ILoginProps> = ({ isAuthorized }): JSX.Element => {
  const dispatch = useAppDispatch();

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

    if (!email || !password) {
      return;
    }

    const user = {
      email: email,
      password: password
    };

    dispatch(userLogin(user as ILogin));
  };

  if (isAuthorized) {
    return <Navigate to={AppRoute.Main} />;
  }

  return (
    <div className="page page--gray page--login">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link to={AppRoute.Main}>
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
              </Link>
            </div>
          </div>
        </div>
      </header>
      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form
              className="login__form form"
              method="post"
              onSubmit={handleSubmit}
              data-testid="login-form"
            >
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input className="login__input form__input" type="email" name="email" placeholder="Email" data-testid="emailElement" required />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input className="login__input form__input" type="password" name="password" placeholder="Password" data-testid="passwordElement" required />
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
