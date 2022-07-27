import { configureStore } from '@reduxjs/toolkit';
import basketSlice from '../slice/basketSlice';

export const store = configureStore({
  reducer: {
    basket: basketSlice,
  },
});
