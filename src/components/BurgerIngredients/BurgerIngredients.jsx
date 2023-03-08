/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// eslint-disable-next-line no-unused-vars
import { Tab, Typography, Box } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerIngredientsStyle from './BurgerIngredients.module.css';
import FoodCard from '../FoodCard/FoodCard';
import { getIngredients } from '../../services/slices/ingredientsSlice';
import Loader from '../Loader/Loader';
import { useInView } from "react-intersection-observer";
import { getInitialIngredients, getisIngredientArrayLoading } from '../../services/slices/ingredientsSlice';

function BurgerIngredients() {
  const isLoading = useSelector(getisIngredientArrayLoading);
  const ingredients = useSelector(getInitialIngredients);
  const dispatch = useDispatch();

  const buns = useMemo(() => ingredients.filter((item) => item.type === 'bun'), [ingredients]);
  const mains = useMemo(() => ingredients.filter((item) => item.type === 'main'), [ingredients]);
  const sauces = useMemo(() => ingredients.filter((item) => item.type === 'sauce'), [ingredients]);

  const [refBuns, inViewBuns] = useInView({ threshold: 0.05 });
  const [refSauces, inViewSauces] = useInView({ threshold: 0.05 });
  const [refMains, inViewMains] = useInView({ threshold: 0.05 });

  const bunRefHeader = useRef();
  const sauceRefHeader = useRef();
  const mainRefHeader = useRef();

  const activeTab = () => {
    if (inViewBuns) {
      return 1
    } else if (inViewSauces) {
      return 2
    } else if (inViewMains) {
      return 3
    }
  }

  const handleButtonClick = (ref) =>
    ref.current.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest',
    })


  useEffect(() => {
    dispatch(getIngredients())
  }, [])

  return (
    <>
      <section className={`${BurgerIngredientsStyle.section} mt-10`}>
        <h2 className="text text_type_main-large mb-5">Соберите бургер</h2>
        <nav className={BurgerIngredientsStyle.nav}>
          <Tab value="buns" active={activeTab() === 1} onClick={() => handleButtonClick(bunRefHeader)}>
            Булки
          </Tab>
          <Tab value="sauces" active={activeTab() === 2} onClick={() => handleButtonClick(sauceRefHeader)}>
            Соусы
          </Tab>
          <Tab value="mains" active={activeTab() === 3} onClick={() => handleButtonClick(mainRefHeader)}>
            Начинки
          </Tab>
        </nav>
        <div className={`${BurgerIngredientsStyle.ingredients} ${isLoading && BurgerIngredientsStyle.loading} mt-10`}>
          {isLoading ? <Loader />
            :
            <>
              <h3 ref={bunRefHeader} id="buns" className="foodtype text text_type_main-medium mb-6">Булки</h3>
              <div ref={refBuns} className={`${BurgerIngredientsStyle.foodcards} ml-4`}>
                {buns.map((data) => (
                  <FoodCard
                    card={data}
                    key={data._id} />
                ))
                }
              </div>
              <h3 ref={sauceRefHeader} id="sauce" className="text text_type_main-medium mb-6 mt-10">Соусы</h3>
              <div ref={refSauces} className={`${BurgerIngredientsStyle.foodcards} ml-4`}>
                {sauces.map((data) => (
                  <FoodCard
                    card={data}
                    key={data._id} />
                ))
                }
              </div>
              <h3 ref={mainRefHeader} id="main" className="text text_type_main-medium mb-6 mt-10">Начинки</h3>
              <div ref={refMains} className={`${BurgerIngredientsStyle.foodcards} ml-4`}>
                {mains.map((data) => (
                  <FoodCard
                    card={data}
                    key={data._id} />
                ))
                }
              </div>
            </>}
        </div>
      </section>
    </>
  )
}

export default BurgerIngredients
