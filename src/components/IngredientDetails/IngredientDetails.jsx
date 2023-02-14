import IngredientDetailsStyle from './IngredientDetails.module.css';
// eslint-disable-next-line no-unused-vars
import { Typography } from '@ya.praktikum/react-developer-burger-ui-components';
import { foodElementPropTypes } from '../../utils/prop-types';

function IngredientDetails({ card }) {
  return (
    <div className={IngredientDetailsStyle.container}>
      <img src={card.image_large} alt={card.name} />
      <h3 className={`${IngredientDetailsStyle.name} text text_type_main-medium`}>
        {card.name}
      </h3>
      <div className={`${IngredientDetailsStyle.details} text text_type_main-default text_color_inactive`}>
        <p className={IngredientDetailsStyle.info}>
          Калории, ккал
          <span className={`${IngredientDetailsStyle.digits} text_type_digits-default`}>
            {card.calories}
          </span>
        </p>
        <p className={IngredientDetailsStyle.info}>
          Белки, г
          <span className={`${IngredientDetailsStyle.digits} text_type_digits-default`}>
            {card.proteins}
          </span>
        </p>
        <p className={IngredientDetailsStyle.info}>
          Жиры, г
          <span className={`${IngredientDetailsStyle.digits} text_type_digits-default`}>
            {card.fat}
          </span>
        </p>
        <p className={IngredientDetailsStyle.info}>
          Углеводы, г
          <span className={`${IngredientDetailsStyle.digits} text_type_digits-default`}>
            {card.carbohydrates}
          </span>
        </p>
      </div>
    </div>
  )
}

IngredientDetails.propTypes = {
  card: foodElementPropTypes.isRequired,
}

export default IngredientDetails
