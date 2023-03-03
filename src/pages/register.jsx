// eslint-disable-next-line no-unused-vars
import { EmailInput, PasswordInput, Input, Typography } from '@ya.praktikum/react-developer-burger-ui-components';
import { FormElement } from '../components/FormElement/FormElement';
import { RedirectLink } from '../components/RedirectLink/RedirectLink';

export function RegisterPage() {

  return (
    <>
      <FormElement title="Регистрация" button="Зарегистрироваться">
        <Input />
        <EmailInput />
        <PasswordInput />
      </FormElement>
      <RedirectLink linktext="Войти" link="/login" linkquestion ="Уже зарегистрированы?"/>
    </>
  )
}
