import { createSlice } from '@reduxjs/toolkit';
import { BUN } from '../../utils/data';

const initialState = {
  constructor: [],
}

const constructorSlice = createSlice({
  name: 'constructor',
  initialState,
  reducers: {
    addIngredient: (state, action) => {
      if (action.payload.type === BUN) {
        const foundBunIndex = state.constructor.findIndex((p) => p.type === BUN)
        if (foundBunIndex === -1) {
          state.constructor = [...state.constructor, action.payload]
          return
        }
        state.constructor.splice(foundBunIndex, 1)
      }
      state.constructor = [...state.constructor, action.payload]
    },
    deleteIngredient: (state, action) => {
      const foundIndex = state.constructor.findIndex((p) => p._id === action.payload)
      state.constructor.splice(foundIndex, 1)
    },
    setNewConstructorArray: (state, action) => {
      const bun = state.constructor.find(item => item.type === BUN)
      bun ? state.constructor = [...action.payload, bun] : state.constructor = [...action.payload]
    },
  },
})

const constructorReducer = constructorSlice.reducer

export default constructorReducer

export const {
  addIngredient,
  deleteIngredient,
  setNewConstructorArray,
  countIngredients } = constructorSlice.actions;

export const getConstructor = state => state.constructorArray.constructor;
