import { EmailInput, PasswordInput, Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Loader from "../components/Loader/Loader";
import { handleLogout, getUser, handleChangeUserData, getLogoutError, getLoading, getChangeUserDataError, getUserDataLoading } from "../services/slices/userSlice";
import profileStyle from './profile.module.css';
import { useFormValidation } from "../hooks/useFormValidation";

export function ProfilePage() {
  const { pathname } = useLocation();
  const error = useSelector(getLogoutError);
  const userError = useSelector(getChangeUserDataError);
  const userLoading = useSelector(getUserDataLoading);
  const loading = useSelector(getLoading);
  const navigate = useNavigate();
  const user = useSelector(getUser)
  const [successStatus, setSuccessStatus] = useState("");
  const { values, handleChange, setValues, resetForm, isValid } = useFormValidation();
  const dispatch = useDispatch();
  const activeLinkStyle = `${profileStyle.activenavlink} text text_type_main-medium`;
  const inactiveLinkStyle = `${profileStyle.navlink} text text_type_main-medium text_color_inactive`;

  function handleUserLogout() {
    dispatch(handleLogout({ token: localStorage.getItem("refreshToken") })).then(({ payload }) => {
      if (payload.success) {
        navigate('/login');
      }
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(handleChangeUserData(values)).then(({ payload }) => {
      if (payload.success) {
        setSuccessStatus("Ваши данные были успешно изменены!")
      }
    })
  }

  const handleReset = () => {
    resetForm(user)
  }

  useEffect(() => {
    user && setValues(user)
  }, [user, setValues])

  function isChange() {
    if (user) {
      const isChange = values.email !== user.email || values.name !== user.name || values.password;
      return isChange
    }
  }

  if (loading) {
    return (
      <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", marginTop: "50vh" }}>
        <Loader />
      </div>
    )
  }

  return (
    <div className={profileStyle.wrap}>
      <div>
        <nav className={profileStyle.nav}>
          <Link
            className={pathname === "/profile" ? activeLinkStyle : inactiveLinkStyle}
            exact="true"
            to="/profile"
          >
            Профиль
          </Link>
          <Link
            className={pathname === "/profile/orders" ? activeLinkStyle : inactiveLinkStyle}
            exact="true"
            to="orders"
          >
            История заказов
          </Link>
          <button
            onClick={handleUserLogout}
            className={`${profileStyle.button} text text_type_main-medium text_color_inactive`}>
            Выход
          </button>
        </nav>
        <p
          className="text text_type_main-small text_color_inactive">
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </div>
      {userLoading ? <div style={{ display: 'flex', flexDirection: "row", justifyContent: "center" }}><Loader /></div> :
        <form
          className={profileStyle.form}
          onSubmit={handleSubmit}>
          <Input
            type={'text'}
            placeholder={'Имя'}
            name={'name'}
            icon={'EditIcon'}
            value={values.name || ""}
            onChange={handleChange}
          />
          <EmailInput
            placeholder={'Логин'}
            name={'email'}
            icon={'EditIcon'}
            value={values.email || ""}
            onChange={handleChange}
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
          />
          <PasswordInput
            placeholder={'Пароль'}
            name={'password'}
            value={values.password || ""}
            icon="EditIcon"
            onChange={handleChange}
            minLength="6"
          />
          {isChange() && <div className={profileStyle.buttons}>
            <Button
              htmlType="reset"
              onClick={handleReset}
              type="secondary">
              Отменить
            </Button>
            <Button
              htmlType="submit"
              type="primary"
              disabled={!isValid}>
              Сохранить
            </Button>
          </div>}
        </form>}
      <p className="text text_type_main-default text_color_inactive">
        {successStatus}
      </p>
      {(error || userError) && <p style={{ textAlign: 'center' }} className="text text_type_main-default text_color_inactive">
        Что-то пошло не так. {error.name}: {error.message}
      </p>}
    </div>
  )
}
