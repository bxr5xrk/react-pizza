import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    totalPrice: 0,
    pizzaItems: [],
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addPizzaToCart(state, action) {
            const findPizza = state.pizzaItems.find(
                (i) => i.id === action.payload.id
            );
            findPizza
                ? findPizza.count++
                : state.pizzaItems.push({ ...action.payload, count: 1 });

            state.totalPrice = state.pizzaItems.reduce((sum, i) => {
                return sum + (i.price * i.count);
            }, 0);
        },
        removePizzaFromCart(state, action) {
            state.pizzaItems = state.pizzaItems.filter(
                (pizza) => pizza !== action.payload
            );
        },
        clearPizzaCart(state) {
            state.pizzaItems = [];
        },
    },
});

export const { addPizzaToCart, removePizzaFromCart, clearPizzaCart } =
    cartSlice.actions;

export default cartSlice.reducer;
