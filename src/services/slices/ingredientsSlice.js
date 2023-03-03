import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import burgerApi from '../../utils/burger-api';

const initialState = {
  ingredients: [],
  isIngredientArrayLoading: true,
}

export const getIngredients = createAsyncThunk("ingredients/getIngredients", () => {
  return burgerApi.getAllIngredients()
})

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: {
    [getIngredients.pending]: (state) => {
      state.isIngredientArrayLoading = true
    },
    [getIngredients.fulfilled]: (state, action) => {
      state.isIngredientArrayLoading = false
      state.ingredients = action.payload.data
    },
    [getIngredients.rejected]: (state) => {
      state.isIngredientArrayLoading = false
      state.ingredients = initialState.ingredients;
    },
  }
})

const ingredientsReducer = ingredientsSlice.reducer

export default ingredientsReducer

export const getInitialIngredients = state => state.ingredients.ingredients;
export const getisIngredientArrayLoading = state => state.ingredients.isIngredientArrayLoading;
