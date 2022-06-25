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
                <>
                    <h1>{pizza.title}</h1>
                    <img src={pizza.image} alt="pizza" />
                    <p>{pizza.price} грн</p>
                </>
            ) : (
                <p>Завантаження...</p>
            )}
        </div>
    );
};

export default PizzaBlock;
