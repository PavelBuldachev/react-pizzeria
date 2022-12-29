import { RootState } from "../store";

export const sortSelector = (state: RootState) => state.filter.sort;
export const categorySelector = (state: RootState) => state.filter.category;
export const sortPropertySelector = (state: RootState) => state.filter.sort.sortProperty;
export const currentPageSelector = (state: RootState) => state.filter.currentPage;
export const searchSelector = (state: RootState) => state.filter.searchValue;