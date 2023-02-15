import React, { useMemo, useState, useContext, useReducer, useEffect } from "react";
import BurgerConstructorStyle from "./BurgerConstructor.module.css";
// eslint-disable-next-line no-unused-vars
import { Box, Typography, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import FoodElement from "../FoodElement/FoodElement";
import MoneyIcon from '../../images/iconMoney.svg';
import Modal from "../Modal/Modal";
import OrderDetails from "../OrderDetails/OrderDetails";
import { BurgerIngredientsContext } from '../../contexts/BurgerIngredientsContext';
import burgerApi from "../../utils/burger-api";
const initialSum = { sum: 0 };

function BurgerConstructor() {
  const ingredients = useContext(BurgerIngredientsContext);

  const [isOrderDetailsPopupOpen, setIsOrderDetailsPopupOpen] = useState(false);
  const [orderNumber, setOrderNumber] = useState(0);
  const [isLoading, setIsLoading] = useState(false)

  const bun = useMemo(() => ingredients.find(ingredient => ingredient.type === 'bun'), [ingredients]);
  const filling = useMemo(() => ingredients.filter(ingredient => ingredient.type !== 'bun'), [ingredients]);

  const totalSum = () => {
    const fillingSum = filling.reduce((sum, current) => sum + current.price, 0)
    return bun ? (fillingSum + bun.price * 2) : fillingSum
  }

  const [burgerSum, burgerSumDispatcher] = useReducer(reducer, initialSum);

  useEffect(() => {
    burgerSumDispatcher()
  }, [ingredients])

  function reducer(burgerSum, action) {
    return { sum: totalSum() };
  }

  function getOrderNumber() {
    setIsLoading(true)
    burgerApi.makeNewOrder(ingredients.map(item => item._id))
      .then((res) => {
        if (res.success) {
          setOrderNumber(res.order.number)
        } else {
          return Promise.reject('Ошибка данных');
        }
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setIsLoading(false)
      })
  }

  function openOrderDetailsPopup() {
    getOrderNumber();
    setIsOrderDetailsPopupOpen(true);
  }

  function closeOrderDetailsPopup() {
    setIsOrderDetailsPopupOpen(false);
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
            {filling.map((element) => (
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
              {burgerSum.sum}
            </p>
            <img src={MoneyIcon} alt="" className={BurgerConstructorStyle.moneyicon} />
          </div>
          <Button htmlType="button" type="primary" size="medium" onClick={openOrderDetailsPopup}>
            Оформить заказ
          </Button>
        </div>
      </section>
      {isOrderDetailsPopupOpen && <Modal onClose={closeOrderDetailsPopup}>
        <OrderDetails orderNumber={orderNumber} isLoading={isLoading}/>
      </Modal>}
    </>
  )
}

export default BurgerConstructor
