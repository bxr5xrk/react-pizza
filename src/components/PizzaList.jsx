import React, { useEffect, useState } from "react";
import Categories from "./Categories";
import Pizza from "./PizzaItem";
import PizzaSkeleton from "./PizzaSkeleton";
import Sort from "./Sort";

const PizzaList = ({ children }) => {
    const [pizza, setPizza] = useState([]);

    // for skeleton
    const [isLoading, setIsLoading] = useState(true);

    // global state
    const [categoryId, setCategoryId] = useState(0);
    const [sortType, setSortType] = useState({
        name: "за популярністю",
        sortProp: "rating",
    });

    // move to other file component in folder API
    useEffect(() => {
        setIsLoading(true);

        const category = categoryId > 0 ? `category=${categoryId}` : "";
        const sort = sortType.sortProp.replace("-", "");
        const sortOrder = sortType.sortProp.includes("-") ? "asc" : "desc";

        fetch(
            `https://62a1db14cd2e8da9b0fca398.mockapi.io/pizza?${category}&sortBy=${sort}&order=${sortOrder}`
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
                    ? [...new Array(4)].map((_, i) => <PizzaSkeleton key={i} />)
                    : pizza.map((item) => <Pizza key={item.id} {...item} />)}
            </div>
        </div>
    );
};

export default PizzaList;
