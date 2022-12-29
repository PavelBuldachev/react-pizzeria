import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FilterSliceState, Sort, SortPropertyEnum } from './types';

const initialState: FilterSliceState = {
  category: 0,
  sort: {
    name: 'популярности',
    sortProperty: SortPropertyEnum.RATING_DESC,
  },
  currentPage: 1,
  searchValue: '',
}

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategory(state, action: PayloadAction<number>) {
        state.category = action.payload;
    },
    setSort(state, action: PayloadAction<Sort>) {
        state.sort = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
  },
})

export const { setSearchValue, setCategory, setSort, setCurrentPage } = filterSlice.actions;

export default filterSlice.reducer;