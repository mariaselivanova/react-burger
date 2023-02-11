import React, { useEffect, useState } from 'react';
import AppStyle from './App.module.css';
import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import burgerApi from '../../utils/burger-api';

function App() {
  const [isIngredientPopupOpen, setIsIngredientPopupOpen] = useState(false);
  const [isOrderDetailsPopupOpen, setIsOrderDetailsPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    burgerApi.getAllIngredients()
      .then((food) => setIngredients(food.data))
      .catch((err) => console.log(err));
  }, [])

  function openOrderDetailsPopup() {
    setIsOrderDetailsPopupOpen(true);
  }

  function openIngredientDetailsPopup(card) {
    setIsIngredientPopupOpen(true);
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setIsOrderDetailsPopupOpen(false)
    setIsIngredientPopupOpen(false);
    setSelectedCard(null)
  }

  return (
    <div>
      <AppHeader />
      <main className={AppStyle.main}>
        <BurgerIngredients
          burgerData={ingredients}
          onClose={closeAllPopups}
          onCardClick={openIngredientDetailsPopup}
          card={selectedCard}
          open={isIngredientPopupOpen} />
        <BurgerConstructor
          burgerData={ingredients}
          onClose={closeAllPopups}
          onButtonClick={openOrderDetailsPopup}
          open={isOrderDetailsPopupOpen} />
      </main>
    </div>
  );
}

export default App;
