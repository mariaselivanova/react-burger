import FormElementStyle from './FormElement.module.css';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';

export function FormElement({ title, children, button, onSubmit, disabled }) {
  return (
    <div className={FormElementStyle.wrap}>
      <h2 className="text text_type_main-medium">{title}</h2>
      <form className={FormElementStyle.form} onSubmit={onSubmit}>
        {children}
        <Button disabled={disabled} htmlType="submit">{button}</Button>
      </form>
    </div>
  )
}

FormElement.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
  button: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
}
