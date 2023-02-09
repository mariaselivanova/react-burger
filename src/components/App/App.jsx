import React, { useEffect, useState } from 'react';
import AppStyle from './App.module.css';
import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import { API_URL } from '../../utils/data';
import Modal from '../Modal/Modal';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import OrderDetails from '../OrderDetails/OrderDetails';

function App() {

  const [ingredients, setIngredients] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  useEffect(() => {
    getAllIngredients()
      .then((food) => setIngredients(food.data))
      .catch((err) => console.log(err));
  }, [])

  const getAllIngredients = () => {
    return fetch(API_URL)
      .then((res) => {
        if (res.ok) {
          return res.json()
        }
        return Promise.reject(`Ошибка: ${res.status}`)
      })
  }

  function openPopup() {
    setIsOpen(true);
  }

  function closePopup() {
    setIsOpen(false)
  }

  function closeCardPopup() {
    closePopup()
    setSelectedCard(null)
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    openPopup()
  }

  return (
    <div>
      <AppHeader />
      <main className={AppStyle.main}>
        <BurgerIngredients
          burgerData={ingredients}
          onCardClick={handleCardClick} />
        <BurgerConstructor
          burgerData={ingredients}
          onButtonClick={openPopup} />
      </main>
      <Modal
        open={isOpen}
        onClose={selectedCard ? closeCardPopup : closePopup}
        title={selectedCard ? "Детали ингредиента" : ""}>
        {selectedCard ? <IngredientDetails card={selectedCard} /> : <OrderDetails />}
      </Modal>
    </div>
  );
}

export default App;
