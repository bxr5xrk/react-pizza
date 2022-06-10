import React, { useEffect, useState } from "react";
import Pizza from "./PizzaItem";
import PizzaSkeleton from "./PizzaSkeleton";

const PizzaList = ({ children }) => {
    const [pizza, setPizza] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // move to other file component in folder API
    useEffect(() => {
        fetch("https://62a1db14cd2e8da9b0fca398.mockapi.io/pizza")
            .then((res) => res.json())
            .then((arr) => {
                setIsLoading(false);
                setPizza(arr);
            });
        window.scrollTo(0, 0);
    }, []);

    return (
        <div>
            <h2 className="content__title">{children}</h2>
            <div className="content__items">
                {isLoading
                    ? [...new Array(6)].map((_, i) => <PizzaSkeleton key={i} />)
                    : pizza.map((data) => <Pizza key={data.id} {...data} />)}
            </div>
        </div>
    );
};

export default PizzaList;
