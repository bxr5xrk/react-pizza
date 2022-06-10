import React from "react";
import PizzaFilter from "../components/PizzaFilter";
import PizzaList from "../components/PizzaList";

const PizzaPage = () => {
    return (
        <div>
            <div className="container">
                <PizzaFilter />
                <PizzaList children="Pizza" />
            </div>
        </div>
    );
};

export default PizzaPage;
