import React from "react";
import Pizza from "./PizzaItem";
import pizza from "../assets/pizza.json";

const PizzaList = ({ children }) => {
    return (
        <div>
            <h2 className="content__title">{children}</h2>
            <div className="content__items">
                {pizza.map((data) => (
                    <Pizza key={data.id} {...data} />
                ))}
            </div>
        </div>
    );
};

export default PizzaList;
