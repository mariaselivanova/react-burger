import { FormElement } from "../../components/FormElement/FormElement";
import { EmailInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { RedirectLink } from "../../components/RedirectLink/RedirectLink";
import { useDispatch, useSelector } from "react-redux";
import { findUserEmail, getFindUserError, getLoading } from "../../services/slices/userSlice";
import { useLocation, useNavigate } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import { useFormValidation } from "../../hooks/useFormValidation";
import ForgotPasswordStyle from './forgot-password.module.css';

export function ForgotPasswordPage() {
  const { values, handleChange, isValid } = useFormValidation();
  const error = useSelector(getFindUserError);
  const loading = useSelector(getLoading);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(findUserEmail({ email: values.email })).then(({ payload }) => {
      if (payload.success) {
        navigate('/reset-password', { state: { prevLocation: location } });
      }
    });
  }
  if (loading) {
    <Loader />
  }

  return (
    <>
      <FormElement
        title="Восстановление пароля"
        button="Восстановить"
        onSubmit={handleSubmit}
        disabled={!isValid}
      >
        <EmailInput
          autoFocus
          name={'email'}
          value={values.email || ""}
          onChange={handleChange}
          placeholder="Укажите e-mail"
          required pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
        />
      </FormElement>
      <RedirectLink
        linktext="Войти"
        link="/login"
        linkquestion="Вспомнили пароль?"
      />
      {error && <p className={`${ForgotPasswordStyle.errortext} text text_type_main-default text_color_inactive`}>
        Что-то пошло не так. {error.name}: {error.message}
      </p>}
    </>
  )
}
