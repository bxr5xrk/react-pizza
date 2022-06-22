import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    totalPrice: 0,
    pizzaItems: [],
};

const calculateTotalPrice = (state) => {
    state.totalPrice = state.pizzaItems.reduce(
        (sum, i) => sum + i.price * i.count,
        0
    );
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

            calculateTotalPrice(state);
        },
        pizzaitemDecrement(state, action) {
            const findPizza = state.pizzaItems.find(
                (i) => i.id === action.payload
            );
            if (findPizza) {
                findPizza.count--;
            }
            if (findPizza.count === 0) {
                state.pizzaItems = state.pizzaItems.filter(
                    (pizza) => pizza.id !== action.payload
                );
            }

            calculateTotalPrice(state);
        },
        removePizzaFromCart(state, action) {
            state.pizzaItems = state.pizzaItems.filter(
                (pizza) => pizza.id !== action.payload
            );

            calculateTotalPrice(state);
        },
        clearPizzaCart(state) {
            state.pizzaItems = [];
            state.totalPrice = 0;
        },
    },
});

export const {
    addPizzaToCart,
    removePizzaFromCart,
    pizzaitemDecrement,
    clearPizzaCart,
} = cartSlice.actions;

export default cartSlice.reducer;
