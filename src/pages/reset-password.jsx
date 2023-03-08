import { FormElement } from "../components/FormElement/FormElement";
import { Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { RedirectLink } from "../components/RedirectLink/RedirectLink";
import { useDispatch, useSelector } from "react-redux";
import { getResetPasswordError, resetUserPassword, getLoading } from "../services/slices/userSlice";
import { useNavigate, useLocation } from "react-router-dom";
import Loader from "../components/Loader/Loader";
import { useFormValidation } from "../hooks/useFormValidation";

export function ResetPasswordPage() {
  const { values, handleChange, isValid } = useFormValidation();
  const location = useLocation();
  const navigate = useNavigate();
  const error = useSelector(getResetPasswordError);
  const loading = useSelector(getLoading);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(resetUserPassword(values)).then(({ payload }) => {
      if (payload.success) {
        navigate('/login', { state: { prevLocation: location } });
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
      <FormElement
        title="Восстановление пароля"
        button="Сохранить"
        onSubmit={handleSubmit}
        disabled={!isValid}
      >
        <PasswordInput
          autoFocus
          name={'password'}
          value={values.password || ""}
          onChange={handleChange}
          placeholder={'Введите новый пароль'}
          required
          minLength="6" />
        <Input
          name={'token'}
          type={'text'}
          placeholder={'Введите код из письма'}
          value={values.token || ""}
          onChange={handleChange}
          required />
      </FormElement>
      <RedirectLink
        linktext="Войти"
        link="/login"
        linkquestion="Вспомнили пароль?"
      />
      {error && <p style={{ textAlign: 'center' }} className="text text_type_main-default text_color_inactive">
        Что-то пошло не так. {error.name}: {error.message}
      </p>}
    </>
  )
}
