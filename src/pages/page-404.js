import { Link } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { Typography } from '@ya.praktikum/react-developer-burger-ui-components';

export function PageNotFound() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '120px', gap: '80px' }}>
      <h1 className="text text_type_main-large">
        Страница не найдена
      </h1>
      <Link
        style={{ textDecoration: 'none' }}
        className="text text_type_main-default text_color_inactive"
        to="/"
        replace>
        Вернуться на главную
      </Link>
    </div>
  )
}
