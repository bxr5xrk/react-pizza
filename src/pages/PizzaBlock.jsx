import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const PizzaBlock = () => {
    // get pizza id from search query
    const { id } = useParams();

    const [pizza, setPizza] = useState();

    useEffect(() => {
        const fetchPizza = async (id) => {
            try {
                const { data } = await axios.get(
                    `https://62a1db14cd2e8da9b0fca398.mockapi.io/pizza/${id}`
                );
                setPizza(data);
            } catch (e) {
                console.log(e);
            }
        };
        fetchPizza(id);
    }, [id]);

    return (
        <div className="container">
            {pizza ? (
                <div className="pizza-page">
                    <img
                        className="pizza-block__image"
                        src={pizza.image}
                        alt="pizza"
                    />
                    <div className="pizza-page__info">
                        <h1>{pizza.title}</h1>

                        <p className="pizza-block__price">{pizza.price} грн</p>
                    </div>
                </div>
            ) : (
                <p>Завантаження...</p>
            )}
        </div>
    );
};

export default PizzaBlock;
