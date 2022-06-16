import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    categoryId: 0,
    sortType: { name: "за популярністю", sortProp: "rating" },
    page: 1,
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
            state.page = action.payload;
        },
    },
});

export const { setCategoryId, setSortType, onChangePage } = filterSlice.actions;

export default filterSlice.reducer;
