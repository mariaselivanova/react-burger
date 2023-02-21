import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import burgerApi from '../../utils/burger-api';
import { BUN } from '../../utils/data';

const initialState = {
  ingredients: [],
  constructor: [],
  ingredient: null,
  order: 0,
  isIngredientArrayLoading: true,
  isOrderNumberLoading: true,
}

export const getIngredients = createAsyncThunk("burger/getIngredients", () => {
  return burgerApi.getAllIngredients()
})

export const getOrderNumber = createAsyncThunk(
  "burger/getOrderNumber",
  async (ingredientsIds) => {
    return burgerApi.makeNewOrder(ingredientsIds)
  })

const burgerSlice = createSlice({
  name: 'burger',
  initialState,
  reducers: {
    setSelectedIngredient: (state, action) => {
      state.ingredient = action.payload
    },
    clearSelectedIngredient: (state) => {
      state.ingredient = {}
    },
    addIngredient: (state, action) => {
      const selectedIngredient = state.ingredients.find(ingredient => ingredient._id === action.payload)
      if (selectedIngredient.type === BUN) {
        const foundBunIndex = state.constructor.findIndex((p) => p.type === BUN)
        if (foundBunIndex === -1) {
          state.constructor = [...state.constructor, selectedIngredient]
          return
        }
        state.constructor.splice(foundBunIndex, 1)
      }
      state.constructor = [...state.constructor, selectedIngredient]
    },
    deleteIngredient: (state, action) => {
      const foundIndex = state.constructor.findIndex((p) => p._id === action.payload)
      state.constructor.splice(foundIndex, 1)
    },
    setNewConstructorArray: (state, action) => {
      const bun = state.constructor.find(item => item.type === BUN)
      bun ? state.constructor = [...action.payload, bun] : state.constructor = [...action.payload]
    }

  },
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
    },

    [getOrderNumber.pending]: (state) => {
      state.isOrderNumberLoading = true
    },
    [getOrderNumber.fulfilled]: (state, action) => {
      state.isOrderNumberLoading = false
      state.order = action.payload.order.number
    },
    [getOrderNumber.rejected]: (state) => {
      state.isOrderNumberLoading = false
    },
  }
})

const burgerReducer = burgerSlice.reducer

export default burgerReducer

export const {
  setSelectedIngredient,
  clearSelectedIngredient,
  addIngredient,
  deleteIngredient,
  setNewConstructorArray } = burgerSlice.actions;
