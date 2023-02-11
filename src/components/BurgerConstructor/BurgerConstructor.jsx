import React, { useMemo } from "react";
import BurgerConstructorStyle from "./BurgerConstructor.module.css";
// eslint-disable-next-line no-unused-vars
import { Box, Typography, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import FoodElement from "../FoodElement/FoodElement";
import MoneyIcon from '../../images/iconMoney.svg';
import PropTypes from 'prop-types';
import { foodElementPropTypes } from '../../utils/prop-types';
import Modal from "../Modal/Modal";
import OrderDetails from "../OrderDetails/OrderDetails";

function BurgerConstructor({ burgerData, onButtonClick, open, onClose }) {

  const bun = useMemo(() => burgerData.find(ingredient => ingredient.type === 'bun'), [burgerData]);
  const ingredients = useMemo(() => burgerData.filter(ingredient => ingredient.type !== 'bun'), [burgerData]);
  const burgerSum = () => {
    return bun.price * 2 + ingredients.reduce((sum, current) => sum + current.price, 0)
  }

  return (
    <>
    <section className={`${BurgerConstructorStyle.section} pt-25`}>
      <div className={BurgerConstructorStyle.listsection}>
        {bun && <FoodElement
          type="top"
          name={`${bun.name} (верх)`}
          isLocked={true}
          price={bun.price}
          thumbnail={bun.image_mobile}
        />}
        <div className={BurgerConstructorStyle.list}>
          {ingredients.map((element) => (
            <FoodElement
              key={element._id}
              type={element.type}
              name={element.name}
              isLocked={false}
              price={element.price}
              thumbnail={element.image_mobile}
            />
          ))}
        </div>
        {bun && <FoodElement
          type="bottom"
          name={`${bun.name} (низ)`}
          isLocked={true}
          price={bun.price}
          thumbnail={bun.image_mobile}
        />}
      </div>
      <div className={`${BurgerConstructorStyle.orderinfo} mt-10 mb-6`}>
        <div className={`${BurgerConstructorStyle.price} mr-10`}>
          <p className="text text_type_digits-medium mr-2">
            {bun && ingredients && burgerSum()}
          </p>
          <img src={MoneyIcon} alt="" className={BurgerConstructorStyle.moneyicon} />
        </div>
        <Button htmlType="button" type="primary" size="medium" onClick={onButtonClick}>
          Оформить заказ
        </Button>
      </div>
    </section>
    {open && <Modal open={open} onClose={onClose}>
      <OrderDetails/>
    </Modal>}
    </>
  )
}

BurgerConstructor.propTypes = {
  burgerData: PropTypes.arrayOf(foodElementPropTypes.isRequired).isRequired,
  onButtonClick: PropTypes.func.isRequired
};

export default BurgerConstructor
