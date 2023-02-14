import FoodCardStyle from './FoodCard.module.css';
import PropTypes from 'prop-types';
// eslint-disable-next-line no-unused-vars
import { CurrencyIcon, Counter, Typography, Box } from '@ya.praktikum/react-developer-burger-ui-components';
import { foodElementPropTypes } from '../../utils/prop-types';

function FoodCard({ card, onCardClick }) {

  function handleCardClick() {
    onCardClick(card)
  };

  return (
    <article className={FoodCardStyle.card} onClick={handleCardClick}>
      <Counter count={2} size="default" className={FoodCardStyle.counter} />
      <img src={card.image} className={FoodCardStyle.pic} alt={card.name} />
      <div className={`${FoodCardStyle.price} mt-1 mb-3`}>
        <p className={`${FoodCardStyle.pricevalue} mr-2 text text_type_digits-default`}>{card.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className={`${FoodCardStyle.name} text text_type_main-default pb-6`}>{card.name}</p>
    </article>
  )
}

FoodCard.propTypes = {
  card: foodElementPropTypes.isRequired,
  onCardClick: PropTypes.func.isRequired
}

export default FoodCard
