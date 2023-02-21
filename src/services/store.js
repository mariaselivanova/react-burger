import { configureStore } from '@reduxjs/toolkit';
import burgerReducer from './burger/burgerSlice';

export const store = configureStore({
  reducer: {
    burger: burgerReducer,
  }
})
