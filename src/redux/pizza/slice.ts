import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { fetchPizzas } from './asyncActions';
import { IPizzaSliceState, TPizza, Status } from './types';

const initialState: IPizzaSliceState = {
  items: [],
  status: Status.LOADING,
};

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<TPizza[]>) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzas.pending, (state) => {
        state.items = [];
        state.status = Status.LOADING;
      })
      .addCase(fetchPizzas.fulfilled, (state, action: PayloadAction<TPizza[]>) => {
        state.items = action.payload;
        state.status = Status.SUCCESS;
      })
      .addCase(fetchPizzas.rejected, (state) => {
        state.items = [];
        state.status = Status.ERROR;
      });
  },
});

export const { setItems } = pizzaSlice.actions;
export default pizzaSlice.reducer;
