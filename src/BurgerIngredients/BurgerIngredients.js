import React from 'react';
import { Tab, Typography, Box } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerIngredientsStyle from './BurgerIngredients.module.css';
import FoodCard from '../FoodCard/FoodCard';

function BurgerIngredients({ burgerData }) {
  const [current, setCurrent] = React.useState('Булки')
  return (
    <section className={`${BurgerIngredientsStyle.section} mt-10`}>
      <h2 className="text text_type_main-large mb-5">Соберите бургер</h2>
      <nav className={BurgerIngredientsStyle.nav}>
        <a href="#buns" className={BurgerIngredientsStyle.link}>
          <Tab value="Булки" active={current === 'Булки'} onClick={setCurrent}>
            Булки
          </Tab>
        </a>
        <a href="#sauce" className={BurgerIngredientsStyle.link}>
          <Tab value="Соусы" active={current === 'Соусы'} onClick={setCurrent}>
            Соусы
          </Tab>
        </a>
        <a href="#main" className={BurgerIngredientsStyle.link}>
          <Tab value="Начинки" active={current === 'Начинки'} onClick={setCurrent}>
            Начинки
          </Tab>
        </a>
      </nav>
      <div className={`${BurgerIngredientsStyle.ingredients} mt-10`}>
        <h3 id="buns" className="text text_type_main-medium mb-6">Булки</h3>
        <div className={`${BurgerIngredientsStyle.foodcards} ml-4`}>
          {burgerData.map((data) => (
            data.type === "bun" && <FoodCard
                                      key={data._id}
                                      img={data.image}
                                      price={data.price}
                                      name={data.name} />
          ))
          }
        </div>
        <h3 id="sauce" className="text text_type_main-medium mb-6 mt-10">Соусы</h3>
        <div className={`${BurgerIngredientsStyle.foodcards} ml-4`}>
          {burgerData.map((data) => (
            data.type === "sauce" && <FoodCard
                                        key={data._id}
                                        img={data.image}
                                        price={data.price}
                                        name={data.name} />
          ))
          }
        </div>
        <h3 id="main" className="text text_type_main-medium mb-6 mt-10">Начинки</h3>
        <div className={`${BurgerIngredientsStyle.foodcards} ml-4`}>
          {burgerData.map((data) => (
            data.type === "main" && <FoodCard
                                      key={data._id}
                                      img={data.image}
                                      price={data.price}
                                      name={data.name} />
            ))
          }
        </div>
      </div>
    </section>
  )
}

export default BurgerIngredients
