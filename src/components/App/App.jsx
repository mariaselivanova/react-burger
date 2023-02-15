import React, { useEffect, useState } from 'react';
import AppStyle from './App.module.css';
import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import burgerApi from '../../utils/burger-api';
import { BurgerIngredientsContext } from '../../contexts/BurgerIngredientsContext';
import Loader from '../Loader/Loader';

function App() {
  const [ingredients, setIngredients] = useState([]);
  const [ingredientsLoading, setIngredientsLoading] = useState(true)

  useEffect(() => {
    burgerApi.getAllIngredients()
      .then((food) => setIngredients(food.data))
      .catch((err) => console.log(err))
      .finally(() => setIngredientsLoading(false))
  }, [])

  return (
    <BurgerIngredientsContext.Provider value={ingredients}>
      <div>
        <AppHeader />
        <main className={AppStyle.main}>
          {ingredientsLoading ? <Loader /> :
            <>
              <BurgerIngredients />
              <BurgerConstructor />
            </>
          }
        </main>

      </div>
    </BurgerIngredientsContext.Provider>
  );
}

export default App;
