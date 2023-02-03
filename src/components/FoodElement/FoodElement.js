import { ConstructorElement, DragIcon, Box } from '@ya.praktikum/react-developer-burger-ui-components';
import FoodElementStyle from './FoodElement.module.css';

function FoodElement({ element }) {
  return (
    <article className={FoodElementStyle.article}>
      <DragIcon />
      <ConstructorElement
        type={element.type}
        isLocked={false}
        text={element.name}
        price={element.price}
        thumbnail={element.image_mobile}
      />
    </article>
  )
}

export default FoodElement
