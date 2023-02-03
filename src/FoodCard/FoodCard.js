import FoodCardStyle from './FoodCard.module.css';
import { CurrencyIcon, Counter, Typography, Box } from '@ya.praktikum/react-developer-burger-ui-components';

function FoodCard({ img, price, name }) {
  return (
    <article className={FoodCardStyle.card}>
      <Counter count={2} size="default" className={FoodCardStyle.counter} />
      <img src={img} className={FoodCardStyle.pic} alt={name} />
      <div className={`${FoodCardStyle.price} mt-1 mb-3`}>
        <p className={`${FoodCardStyle.pricevalue} mr-2 text text_type_digits-default`}>{price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className={`${FoodCardStyle.name} text text_type_main-default pb-6`}>{name}</p>
    </article>
  )
}

export default FoodCard
