import React, { useEffect, useState } from "react";
import PizzaFilter from "./PizzaFilter";
import Pizza from "./PizzaItem";
import PizzaSkeleton from "./PizzaSkeleton";

const PizzaList = ({ children, searchValue }) => {
    const [pizza, setPizza] = useState([]);

    // for skeleton
    const [isLoading, setIsLoading] = useState(true);

    // global state
    const [categoryId, setCategoryId] = useState(0);
    const [sortType, setSortType] = useState({
        name: "за популярністю",
        sortProp: "rating",
    });

    const skeleton = [...new Array(4)].map((_, i) => <PizzaSkeleton key={i} />);

    const filterPizza = pizza
        .filter((item) =>
            searchValue
                ? item.title.toLowerCase().includes(searchValue.toLowerCase())
                : item
        )
        .map((item) =>
            item ? <Pizza key={item.id} {...item} /> : <div>not found</div>
        );

    // move to other file component in folder API
    useEffect(() => {
        setIsLoading(true);

        const category = categoryId > 0 ? `category=${categoryId}` : "";
        const sort = sortType.sortProp.replace("-", "");
        const sortOrder = sortType.sortProp.includes("-") ? "asc" : "desc";

        // get pizza from mocapi
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
            <PizzaFilter
                categoryId={categoryId}
                sortType={sortType}
                setCategoryId={setCategoryId}
                setSortType={setSortType}
            />

            <h2 className="content__title">{children}</h2>
            {isLoading ? (
                <div className="content__items">{skeleton}</div>
            ) : !filterPizza.length ? (
                <div className="not-found">
                    <h1 className="not-found__title">Нічого не знайдено :(</h1>
                    <span className="not-found__bottom-text">
                        Спробуйте ще раз
                    </span>
                </div>
            ) : (
                <div className="content__items">{filterPizza}</div>
            )}
        </div>
    );
};

export default PizzaList;
