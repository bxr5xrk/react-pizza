import React from "react";
import Pizza from "./PizzaItem";
import pizza from "../assets/pizza.json";

const PizzaList = ({ children }) => {
    return (
        <div>
            <h2 className="content__title">{children}</h2>
            <div className="content__items">
                {pizza.map((p) => (
                    <Pizza
                        key={p.id}
                        title={p.title}
                        price={p.price}
                        image={p.imageUrl}
                        sizes={p.sizes}
                        pizzaTypes={p.types}
                    />
                ))}
            </div>
        </div>
    );
};

export default PizzaList;
