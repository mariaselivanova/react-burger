import BurgerConstructorStyle from "./BurgerConstructor.module.css";
// eslint-disable-next-line no-unused-vars
import { Box, Typography, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import FoodElement from "../FoodElement/FoodElement";
import MoneyIcon from '../../images/iconMoney.svg';
import PropTypes from 'prop-types';
import { foodElementPropTypes } from '../../utils/data';

function BurgerConstructor({ burgerData }) {

  const bun = burgerData.find(ingredient => ingredient.type === 'bun');
  const ingredients = burgerData.filter(ingredient => ingredient.type !== 'bun');

  const burgerSum = () => {
    const prices = ingredients.map((item) => item.price)
    let ingredientsSum = 0;
    for (let i = 0; i < prices.length; i++) {
      ingredientsSum += prices[i]
    }
    const finalSum = ingredientsSum + bun.price * 2
    return finalSum
  }

  return (
    <section className={`${BurgerConstructorStyle.section} pt-25`}>
      <div className={BurgerConstructorStyle.listsection}>
        <FoodElement
          element={bun}
          type="top"
          name={`${bun.name} (верх)`}
          isLocked={true}
          price={bun.price}
          thumbnail={bun.image_mobile}
        />
        <div className={BurgerConstructorStyle.list}>
          {ingredients.map((element) => (
            <FoodElement
              element={element}
              key={element._id}
              type={element.type}
              name={element.name}
              isLocked={false}
              price={element.price}
              thumbnail={element.image_mobile}
            />
          ))}
        </div>
        <FoodElement
          element={bun}
          type="bottom"
          name={`${bun.name} (низ)`}
          isLocked={true}
          price={bun.price}
          thumbnail={bun.image_mobile}
        />
      </div>
      <div className={`${BurgerConstructorStyle.orderinfo} mt-10 mb-6`}>
        <div className={`${BurgerConstructorStyle.price} mr-10`}>
          <p className="text text_type_digits-medium mr-2">
            {burgerSum()}
          </p>
          <img src={MoneyIcon} alt="" className={BurgerConstructorStyle.moneyicon} />
        </div>
        <Button htmlType="button" type="primary" size="medium">
          Оформить заказ
        </Button>
      </div>
    </section>
  )
}

BurgerConstructor.propTypes = {
  burgerData: PropTypes.arrayOf(foodElementPropTypes).isRequired
};

export default BurgerConstructor
