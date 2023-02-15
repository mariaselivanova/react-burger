import React, { useEffect, useState } from 'react';
import AppStyle from './App.module.css';
import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import burgerApi from '../../utils/burger-api';
import { ChosenIngredientsContext } from '../../contexts/ChosenIngredientsContext';

function App() {
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    burgerApi.getAllIngredients()
      .then((food) => setIngredients(food.data))
      .catch((err) => console.log(err));
  }, [])

  return (
    <ChosenIngredientsContext.Provider value={ingredients}>
      <div>
        <AppHeader />
        <main className={AppStyle.main}>
          <BurgerIngredients burgerData={ingredients} />
          <BurgerConstructor />
        </main>
      </div>
    </ChosenIngredientsContext.Provider>
  );
}

export default App;
