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
    },
});

export const { setCategoryId, setSortType, onChangePage, onChangeSearchValue } =
    filterSlice.actions;

export default filterSlice.reducer;
