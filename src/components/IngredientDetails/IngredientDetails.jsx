import IngredientDetailsStyle from './IngredientDetails.module.css';
// eslint-disable-next-line no-unused-vars
import { Typography } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedIngredient, getIngredient } from '../../services/slices/ingredientSlice';
import { useLocation, useParams } from 'react-router-dom';
import { getInitialIngredients, getisIngredientArrayLoading } from '../../services/slices/ingredientsSlice';
import { useEffect } from 'react';
import Loader from '../Loader/Loader';

function IngredientDetails() {
  const dispatch = useDispatch();
  const location = useLocation();
  const background = location.state && location.state.background;
  const ingredients = useSelector(getInitialIngredients);
  const loading = useSelector(getisIngredientArrayLoading);
  const ingredient = useSelector(getIngredient);

  const { id } = useParams();

  useEffect(() => {
    dispatch(setSelectedIngredient(ingredients.find((ingredient) => ingredient._id === id)));
  }, [dispatch, id, ingredients]);

  if (loading) {
    return (
      <Loader />
    )
  }

  if (ingredient) {

    return (
      <div className={!background ? IngredientDetailsStyle.wrap : IngredientDetailsStyle.container}>
        {!background && <h2 className={`${IngredientDetailsStyle.title} text text_type_main-large`}>Детали ингредиента</h2>}
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
}

export default IngredientDetails
