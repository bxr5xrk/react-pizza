import React from "react";
import PizzaList from "../components/PizzaList";

const PizzaPage = () => {
    return (
        <div>
            <div className="container">
                <PizzaList children="Pizza" />
            </div>
        </div>
    );
};

export default PizzaPage;
