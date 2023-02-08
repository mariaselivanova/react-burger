import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import FoodElementStyle from './FoodElement.module.css';
import PropTypes from 'prop-types';

function FoodElement({ price, type, name, isLocked, thumbnail }) {
  return (
    <article className={FoodElementStyle.article}>
      {isLocked === false && <DragIcon />}
      <ConstructorElement
        type={type}
        isLocked={isLocked}
        text={name}
        price={price}
        thumbnail={thumbnail}
      />
    </article>
  )
}

FoodElement.propTypes = {
  price: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  isLocked: PropTypes.bool.isRequired,
  thumbnail: PropTypes.string.isRequired
};

export default FoodElement
