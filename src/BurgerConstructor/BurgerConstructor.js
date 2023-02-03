import BurgerConstructorStyle from "./BurgerConstructor.module.css";
import { Box, Typography, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import FoodElement from "../FoodElement/FoodElement";
import MoneyIcon from '../images/iconMoney.svg';

function BurgerConstructor({ burgerData }) {

  const burgerSum = () => {
    const prices = burgerData.map((item) => item.price)
    let finalSum = 0;
    for (let i = 0; i < prices.length; i++) {
      finalSum += prices[i]
    }
    return finalSum
  }

  return (
    <section className={`${BurgerConstructorStyle.section} pt-25`}>
      <div className={BurgerConstructorStyle.list}>
        {burgerData.map((element) => (
          <FoodElement element={element} key={element._id} />
        ))}
      </div>
      <div className={`${BurgerConstructorStyle.orderinfo} mt-10 pr-6 mb-10`}>
        <div className={`${BurgerConstructorStyle.price} mr-10`}>
          <p className="text text_type_digits-medium mr-2">{burgerSum()}</p>
          <img src={MoneyIcon} alt="" className={BurgerConstructorStyle.moneyicon} />
        </div>
        <Button htmlType="button" type="primary" size="medium">
          Оформить заказ
        </Button>
      </div>
    </section>
  )
}

export default BurgerConstructor
