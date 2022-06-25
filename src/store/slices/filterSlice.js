import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    categoryId: 0,
    sortType: { name: "за популярністю", sortProp: "rating" },
    currentPage: 1,
    searchValue: "",
};

const filterSlice = createSlice({
    name: "filter",
    initialState,
    reducers: {
        setCategoryId(state, action) {
            state.categoryId = action.payload;
        },
        setSortType(state, action) {
            state.sortType = action.payload;
        },
        onChangePage(state, action) {
            state.currentPage = action.payload;
        },
        onChangeSearchValue(state, action) {
            state.searchValue = action.payload;
        },
        setSearch(state, action) {
            state.currentPage = Number(action.payload.currentPage);
            state.sortType = action.payload.sortType;
            state.categoryId = Number(action.payload.categoryId);
        },
    },
});

export const selectFilter = (state) => state.filterSlice

export const {
    setCategoryId,
    setSortType,
    onChangePage,
    onChangeSearchValue,
    setSearch,
} = filterSlice.actions;

export default filterSlice.reducer;
