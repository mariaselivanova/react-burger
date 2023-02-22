import React, { useMemo, useState, useReducer, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import BurgerConstructorStyle from "./BurgerConstructor.module.css";
// eslint-disable-next-line no-unused-vars
import { Box, Typography, Button, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import FoodElement from "../FoodElement/FoodElement";
import MoneyIcon from '../../images/iconMoney.svg';
import Modal from "../Modal/Modal";
import OrderDetails from "../OrderDetails/OrderDetails";
import { setNewConstructorArray, addIngredient, getConstructor } from "../../services/slices/constructorSlice";
import { getOrderNumber } from "../../services/slices/orderSlice";
import { useDrop } from "react-dnd/dist/hooks";
import { BUN } from "../../utils/data";

const initialSum = { sum: 0 };

function BurgerConstructor() {
  const { v4: uuidv4 } = require('uuid');
  const constructor = useSelector(getConstructor);
  const dispatch = useDispatch();
  const [isOrderDetailsPopupOpen, setIsOrderDetailsPopupOpen] = useState(false);

  const filling = useMemo(() => constructor.filter(ingredient => ingredient.type !== BUN), [constructor])
  const bun = useMemo(() => constructor.find(ingredient => ingredient.type === BUN), [constructor]);

  const totalSum = () => {
    const fillingSum = filling.reduce((sum, current) => sum + current.price, 0)
    return bun ? (fillingSum + bun.price * 2) : fillingSum
  }

  const [burgerSum, burgerSumDispatcher] = useReducer(reducer, initialSum);

  useEffect(() => {
    burgerSumDispatcher()
  }, [constructor])

  function reducer(burgerSum, action) {
    return { sum: totalSum() };
  }

  function openOrderDetailsPopup() {
    const ingredientsIds = constructor.map(item => item._id)
    dispatch(getOrderNumber(ingredientsIds));
    setIsOrderDetailsPopupOpen(true);
  }

  function closeOrderDetailsPopup() {
    setIsOrderDetailsPopupOpen(false);
  }

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "object",
    drop: (item) => dispatch(addIngredient(item)),
    collect: (monitor) => ({
      isOver: !!monitor.isOver()
    })
  }))

  const moveCard = useCallback((dragIndex, hoverIndex) => {
    const dragCard = filling[dragIndex];
    const newCards = [...filling]
    newCards.splice(dragIndex, 1)
    newCards.splice(hoverIndex, 0, dragCard)
    dispatch(setNewConstructorArray(newCards))
  }, [filling, dispatch]);

  return (
    <>
      <section className={`${BurgerConstructorStyle.section} pt-25`} ref={drop}>
        {burgerSum.sum === 0 ?
          <p style={{ boxShadow: isOver && "0px 0px 16px rgba(51, 51, 255, 0.25), 0px 0px 8px rgba(51, 51, 255, 0.25), 0px 4px 32px rgba(51, 51, 255, 0.5)" }} className={`${BurgerConstructorStyle.paragraph} text text_type_main-medium ${!isOver && 'text_color_inactive'}`}>Здесь будет бургер</p>
          :
          <div className={BurgerConstructorStyle.listsection}>
            {bun && <FoodElement
              type="top"
              name={`${bun.name} (верх)`}
              isLocked={true}
              price={bun.price}
              thumbnail={bun.image_mobile}
            />}
            <div className={BurgerConstructorStyle.list}>
              {filling.map((element, index) => (
                <FoodElement
                  id={element._id}
                  index={index}
                  key={uuidv4()}
                  type={element.type}
                  name={element.name}
                  isLocked={false}
                  price={element.price}
                  thumbnail={element.image_mobile}
                  moveCard={moveCard}
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
          </div>}
        {burgerSum.sum > 0 && <div className={`${BurgerConstructorStyle.orderinfo} mt-10 mb-6`}>
          <div className={`${BurgerConstructorStyle.price} mr-10`}>
            <p className="text text_type_digits-medium mr-2">
              {burgerSum.sum}
            </p>
            <img src={MoneyIcon} alt="" className={BurgerConstructorStyle.moneyicon} />
          </div>
          <Button htmlType="button" type="primary" size="medium" onClick={openOrderDetailsPopup}>
            Оформить заказ
          </Button>
        </div>}
      </section>
      {isOrderDetailsPopupOpen && <Modal onClose={closeOrderDetailsPopup}>
        <OrderDetails />
      </Modal>}
    </>
  )
}

export default BurgerConstructor
