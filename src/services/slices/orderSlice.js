import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import burgerApi from '../../utils/burger-api';

const initialState = {
  order: 0,
  isOrderNumberLoading: true,
}

export const getOrderNumber = createAsyncThunk(
  "order/getOrderNumber",
  async (ingredientsIds) => {
    return burgerApi.makeNewOrder(ingredientsIds)
  })

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  extraReducers: {
    [getOrderNumber.pending]: (state) => {
      state.isOrderNumberLoading = true
    },
    [getOrderNumber.fulfilled]: (state, action) => {
      state.isOrderNumberLoading = false
      state.order = action.payload.order.number
    },
    [getOrderNumber.rejected]: (state) => {
      state.isOrderNumberLoading = false
      state.order = initialState.order
    },
  }
})

const orderReducer = orderSlice.reducer

export default orderReducer

export const getOrder = state => state.order.order
export const getOrderLoading = state => state.order.isOrderNumberLoading
