import { Link } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { Typography } from '@ya.praktikum/react-developer-burger-ui-components';
import PageNotFoundStyle from './page-404.module.css';

export function PageNotFound() {
  return (
    <div className={PageNotFoundStyle.wrap}>
      <h1 className="text text_type_main-large">
        Страница не найдена
      </h1>
      <Link
        className={`${PageNotFoundStyle.link} text text_type_main-default text_color_inactive`}
        to="/"
        replace>
        Вернуться на главную
      </Link>
    </div>
  )
}
