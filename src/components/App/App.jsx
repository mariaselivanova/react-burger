import React, { useEffect, useState } from 'react';
import AppStyle from './App.module.css';
import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import burgerApi from '../../utils/burger-api';

function App() {
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    burgerApi.getAllIngredients()
      .then((food) => setIngredients(food.data))
      .catch((err) => console.log(err));
  }, [])

  return (
    <div>
      <AppHeader />
      <main className={AppStyle.main}>
        <BurgerIngredients
          burgerData={ingredients} />
        <BurgerConstructor
          burgerData={ingredients} />
      </main>
    </div>
  );
}

export default App;
