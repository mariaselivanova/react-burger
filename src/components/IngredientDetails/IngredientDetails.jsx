import IngredientDetailsStyle from './IngredientDetails.module.css';
// eslint-disable-next-line no-unused-vars
import { Typography } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from 'react-redux';

function IngredientDetails() {

  const ingredient = useSelector((state) => state.burger.ingredient);

  return (
    <div className={IngredientDetailsStyle.container}>
      <img src={ingredient.image_large} alt={ingredient.name} />
      <h3 className={`${IngredientDetailsStyle.name} text text_type_main-medium`}>
        {ingredient.name}
      </h3>
      <div className={`${IngredientDetailsStyle.details} text text_type_main-default text_color_inactive`}>
        <p className={IngredientDetailsStyle.info}>
          Калории, ккал
          <span className={`${IngredientDetailsStyle.digits} text_type_digits-default`}>
            {ingredient.calories}
          </span>
        </p>
        <p className={IngredientDetailsStyle.info}>
          Белки, г
          <span className={`${IngredientDetailsStyle.digits} text_type_digits-default`}>
            {ingredient.proteins}
          </span>
        </p>
        <p className={IngredientDetailsStyle.info}>
          Жиры, г
          <span className={`${IngredientDetailsStyle.digits} text_type_digits-default`}>
            {ingredient.fat}
          </span>
        </p>
        <p className={IngredientDetailsStyle.info}>
          Углеводы, г
          <span className={`${IngredientDetailsStyle.digits} text_type_digits-default`}>
            {ingredient.carbohydrates}
          </span>
        </p>
      </div>
    </div>
  )
}

export default IngredientDetails
