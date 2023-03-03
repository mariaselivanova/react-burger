import FormElementStyle from './FormElement.module.css';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';

export function FormElement({title, children, redirect, button}) {
  return(
    <div className={FormElementStyle.wrap}>
      <h2 className="text text_type_main-medium">{title}</h2>
      <form className={FormElementStyle.form}>
        {children}
        <Button>{button}</Button>
      </form>
    </div>
  )
}
