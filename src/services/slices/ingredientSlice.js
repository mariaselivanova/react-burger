import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  ingredient: null,
}

const ingredientSlice = createSlice({
  name: 'ingredient',
  initialState,
  reducers: {
    setSelectedIngredient: (state, action) => {
      state.ingredient = action.payload
    },
    clearSelectedIngredient: (state) => {
      state.ingredient = initialState.ingredient
    },
  }
})

const ingredientReducer = ingredientSlice.reducer

export default ingredientReducer

export const { setSelectedIngredient, clearSelectedIngredient, } = ingredientSlice.actions;

export const getIngredient = state => state.ingredient.ingredient;
