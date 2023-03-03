import { configureStore, combineReducers } from '@reduxjs/toolkit';
import constructorReducer from './slices/constructorSlice';
import ingredientReducer from './slices/ingredientSlice';
import ingredientsReducer from './slices/ingredientsSlice';
import orderReducer from './slices/orderSlice';

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  order: orderReducer,
  constructorArray: constructorReducer,
  ingredient: ingredientReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
