import React from "react";
import PizzaList from "../components/PizzaList";

const PizzaPage = ({ searchValue }) => {
    return (
        <div>
            <div className="container">
                <PizzaList title="Pizza" searchValue={searchValue} />
            </div>
        </div>
    );
};

export default PizzaPage;
