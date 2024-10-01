import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IFilterSliceState, TSort, SortPropertyEnum } from './types';

const initialState: IFilterSliceState = {
  searchValue: '',
  categoryId: 0,
  sort: { name: 'популярности', sortProperty: SortPropertyEnum.RATING },
};

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload;
    },
    setSortType(state, action: PayloadAction<TSort>) {
      state.sort = action.payload;
    },
    setFilters(state, action: PayloadAction<IFilterSliceState>) {
      state.categoryId = Number(action.payload.categoryId);
      state.sort = action.payload.sort;
    },
  },
});

export const { setSearchValue, setCategoryId, setSortType, setFilters } = filterSlice.actions;
export default filterSlice.reducer;
