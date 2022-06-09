import React from "react";
import PizzaFilter from "../components/PizzaFilter";
import PizzaList from "../components/PizzaList";

const PizzaPage = () => {
    return (
        <div>
            <PizzaFilter />
            <PizzaList children="Pizza" />
        </div>
    );
};

export default PizzaPage;
