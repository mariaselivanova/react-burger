// eslint-disable-next-line no-unused-vars
import { EmailInput, PasswordInput, Input, Typography } from '@ya.praktikum/react-developer-burger-ui-components';
import { FormElement } from '../../components/FormElement/FormElement';
import { RedirectLink } from '../../components/RedirectLink/RedirectLink';
import { useDispatch, useSelector } from 'react-redux';
import { getLoading, getRegisterError, handleRegister } from '../../services/slices/userSlice';
import { useNavigate, useLocation } from 'react-router-dom';
import Loader from '../../components/Loader/Loader';
import { useFormValidation } from "../../hooks/useFormValidation";
import RegisterStyle from './register.module.css';

export function RegisterPage() {
  const location = useLocation();
  const { values, handleChange, isValid } = useFormValidation();
  const error = useSelector(getRegisterError);
  const loading = useSelector(getLoading);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(handleRegister(values)).then(({ payload }) => {
      if (payload.success) {
        navigate('/login', { state: { prevLocation: location } });
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
      <FormElement
        title="Регистрация"
        button="Зарегистрироваться"
        onSubmit={handleSubmit}
        disabled={!isValid}
      >
        <Input
          autoFocus
          name={'name'}
          type={'text'}
          placeholder={'Имя'}
          value={values.name || ''}
          onChange={handleChange}
        />
        <EmailInput
          name={'email'}
          value={values.email || ''}
          onChange={handleChange}
          requiered
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
        linktext="Войти"
        link="/login"
        linkquestion="Уже зарегистрированы?"
      />
      {error && <p className={`${RegisterStyle.errortext} text text_type_main-default text_color_inactive`}>
        Что-то пошло не так. {error.name}: {error.message}
      </p>}
    </>
  )
}
