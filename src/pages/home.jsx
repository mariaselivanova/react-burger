import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import BurgerIngredients from '../components/BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../components/BurgerConstructor/BurgerConstructor';
import HomeStyle from './home.module.css';

export function HomePage() {
  return (
    <main className={HomeStyle.main}>
      <DndProvider backend={HTML5Backend}>
        <BurgerIngredients />
        <BurgerConstructor />
      </DndProvider>
    </main>
  )
}
