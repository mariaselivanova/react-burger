// eslint-disable-next-line no-unused-vars
import { EmailInput, PasswordInput, Typography } from '@ya.praktikum/react-developer-burger-ui-components';
import { FormElement } from '../components/FormElement/FormElement';
import { RedirectLink } from '../components/RedirectLink/RedirectLink';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { getLoading, getLoginError, handleLogin } from '../services/slices/userSlice';
import Loader from '../components/Loader/Loader';
import { useFormValidation } from "../hooks/useFormValidation";

export function LoginPage() {
  const { values, handleChange, isValid } = useFormValidation();
  const error = useSelector(getLoginError);
  const loading = useSelector(getLoading);
  let location = useLocation();
  let prevLocation = location.state && location.state.prevLocation;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(handleLogin(values)).then(({ payload }) => {
      if (payload.success) {
        const { from } = location.state || { from: { pathname: '/'}}
        navigate(from)
        localStorage.setItem('refreshToken', payload.refreshToken);
        localStorage.setItem('accessToken', payload.accessToken);
      }
    });
  }

  if (loading) {
    return (
      <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", marginTop: "50vh" }}>
        <Loader />
      </div>
    )
  }

  return (
    <>
      {prevLocation && prevLocation.pathname === "/reset-password" &&
        <p style={{ textAlign: 'center', paddingTop: '3vh' }}
          className="text text_type_main-default text_color_inactive">
          Пароль был успешно изменен!
        </p>}
      {prevLocation && prevLocation.pathname === "/register" &&
        <p style={{ textAlign: 'center', paddingTop: '3vh' }}
          className="text text_type_main-default text_color_inactive">
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
        <p style={{ textAlign: 'center' }}
          className="text text_type_main-default text_color_inactive">
          Что-то пошло не так. {error.name}: {error.message}
        </p>}
    </>
  )
}
