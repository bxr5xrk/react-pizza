import { configureStore } from "@reduxjs/toolkit";
import filterSlice from "./slices/filterSlice";
import searchSlice from "./slices/filterSlice";

export const store = configureStore({
    reducer: {
       filterSlice, searchSlice
    },
});
