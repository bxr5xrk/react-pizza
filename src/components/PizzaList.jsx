import React, { useEffect, useState } from "react";
import Pizza from "./PizzaItem";

const PizzaList = ({ children }) => {
    const [pizza, setPizza] = useState([]);

    // move to other file component in folder API
    useEffect(() => {
        fetch("https://62a1db14cd2e8da9b0fca398.mockapi.io/pizza")
            .then((res) => res.json())
            .then((arr) => setPizza(arr));
    }, []);

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
