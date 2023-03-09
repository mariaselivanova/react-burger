// eslint-disable-next-line no-unused-vars
import { EmailInput, PasswordInput, Typography } from '@ya.praktikum/react-developer-burger-ui-components';
import { FormElement } from '../../components/FormElement/FormElement';
import { RedirectLink } from '../../components/RedirectLink/RedirectLink';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { getLoading, getLoginError, handleLogin } from '../../services/slices/userSlice';
import Loader from '../../components/Loader/Loader';
import { useFormValidation } from "../../hooks/useFormValidation";
import LoginStyle from './login.module.css';

export function LoginPage() {
  const Cookies = require('js-cookie');
  const { values, handleChange, isValid } = useFormValidation();
  const error = useSelector(getLoginError);
  const loading = useSelector(getLoading);
  const location = useLocation();
  const prevLocation = location.state && location.state.prevLocation;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(handleLogin(values)).then(({ payload }) => {
      if (payload.success) {
        const { from } = location.state || { from: { pathname: '/' } }
        navigate(from)
        Cookies.set('refreshToken', payload.refreshToken, { expires: 1 });
        Cookies.set('accessToken', payload.accessToken.substring(7), { expires: 1 });
      }
    });
  }

  if (loading) {
    return (
      <Loader />
    )
  }

  return (
    <>
      {prevLocation && prevLocation.pathname === "/reset-password" &&
        <p className={`${LoginStyle.successtext} text text_type_main-default text_color_inactive`}>
          Пароль был успешно изменен!
        </p>}
      {prevLocation && prevLocation.pathname === "/register" &&
        <p className={`${LoginStyle.successtext} text text_type_main-default text_color_inactive`}>
          Вы успешно зарегистрированы!
        </p>}
      <FormElement
        title="Вход"
        button="Войти"
        disabled={!isValid}
        onSubmit={handleSubmit}>
        <EmailInput
          autoFocus
          name={'email'}
          value={values.email || ''}
          onChange={handleChange}
          required
          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
        />
        <PasswordInput
          name={'password'}
          value={values.password || ''}
          onChange={handleChange}
          required
          minLength="6"
        />
      </FormElement>
      <RedirectLink
        linktext="Зарегистрироваться"
        link="/register"
        linkquestion="Вы — новый пользователь?"
      />
      <RedirectLink
        linktext="Восстановить пароль"
        link="/forgot-password"
        linkquestion="Забыли пароль?"
      />
      {error &&
        <p className={`${LoginStyle.errortext} text text_type_main-default text_color_inactive`}>
          Что-то пошло не так. {error.name}: {error.message}
        </p>}
    </>
  )
}
