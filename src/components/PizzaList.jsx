import React, { useEffect, useState } from "react";
import Categories from "./Categories";
import Pizza from "./PizzaItem";
import PizzaSkeleton from "./PizzaSkeleton";
import Sort from "./Sort";

const PizzaList = ({ children }) => {
    const [pizza, setPizza] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [categoryId, setCategoryId] = useState(0);
    const [sortType, setSortType] = useState({
        name: "популярності",
        sortProp: "rating",
    });

    // move to other file component in folder API
    useEffect(() => {
        setIsLoading(true);
        fetch(
            `https://62a1db14cd2e8da9b0fca398.mockapi.io/pizza?${
                categoryId > 0 ? `category=${categoryId}` : ""
            }&sortBy=${sortType.sortProp.replace("-", "")}&order=${
                sortType.sortProp.includes("-") ? "asc" : "desc"
            }`
        )
            .then((res) => res.json())
            .then((arr) => {
                setIsLoading(false);
                setPizza(arr);
            });
        window.scrollTo(0, 0);
    }, [categoryId, sortType]);

    return (
        <div>
            <div className="content__top">
                <Categories
                    value={categoryId}
                    onChangeCategory={(id) => setCategoryId(id)}
                />
                <Sort value={sortType} onChangeSort={(id) => setSortType(id)} />
            </div>
            <h2 className="content__title">{children}</h2>
            <div className="content__items">
                {isLoading
                    ? [...new Array(6)].map((_, i) => <PizzaSkeleton key={i} />)
                    : pizza.map((pizza) => <Pizza key={pizza.id} {...pizza} />)}
            </div>
        </div>
    );
};

export default PizzaList;
