import React from 'react';
import logo from './logo.svg';
import AppStyle from'./App.module.css';
import AppHeader from './AppHeader/AppHeader';
import BurgerIngredients from './BurgerIngredients/BurgerIngredients';
import BurgerConstructor from './BurgerConstructor/BurgerConstructor';
import { burgerData } from './utils/data';

function App() {
  return (
    <div className="App">
      <AppHeader />
      <main className={AppStyle.main}>
        <BurgerIngredients burgerData={burgerData} />
        <BurgerConstructor burgerData={burgerData} />
      </main>
    </div>
  );
}

export default App;
