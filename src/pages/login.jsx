// eslint-disable-next-line no-unused-vars
import { EmailInput, PasswordInput, Typography } from '@ya.praktikum/react-developer-burger-ui-components';
import { FormElement } from '../components/FormElement/FormElement';
import { RedirectLink } from '../components/RedirectLink/RedirectLink';

export function LoginPage() {

  return (
    <>
    <FormElement title="Вход" button="Войти">
      <EmailInput />
      <PasswordInput />
    </FormElement>
    <RedirectLink linktext="Зарегистрироваться" link="/register" linkquestion ="Вы — новый пользователь?"/>
    <RedirectLink linktext="Восстановить пароль" link="/forgot-password" linkquestion ="Забыли пароль?"/>
  </>
  )
}
