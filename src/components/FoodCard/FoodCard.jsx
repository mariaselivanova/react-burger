/* eslint-disable react-hooks/exhaustive-deps */
import FoodCardStyle from './FoodCard.module.css';
import PropTypes from 'prop-types';
// eslint-disable-next-line no-unused-vars
import { CurrencyIcon, Counter, Typography, Box } from '@ya.praktikum/react-developer-burger-ui-components';
import { foodElementPropTypes } from '../../utils/prop-types';
import { useDrag } from 'react-dnd/dist/hooks';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { BUN } from '../../utils/data';
import { getConstructor } from '../../services/slices/constructorSlice';

function FoodCard({ card, onCardClick }) {
  const constructor = useSelector(getConstructor);
  const [amount, setAmount] = useState(0);
  const [, drag] = useDrag(() => (
    {
      type: "object",
      item: card,
      collect: (monitor) => ({
        didDrop: monitor.didDrop(),
      }),
    }))

  function handleCardClick() {
    onCardClick(card)
  }

  function countIngredients(card) {
    const items = constructor.filter(item => item._id === card._id)
    const amount = items.length
    if (card.type === BUN) {
      return amount * 2
    }
    return amount
  }

  useEffect(() => {
    setAmount(countIngredients(card))
  }, [constructor])

  return (
    <article className={FoodCardStyle.card} onClick={handleCardClick} ref={drag}>
      {amount > 0 && <Counter count={amount} size="default" className={FoodCardStyle.counter} />}
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
