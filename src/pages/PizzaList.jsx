import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { SearchContext } from "../App";
import Pagination from "../components/Pagination/Pagination";
import PizzaFilter from "../components/PizzaFilter";
import Pizza from "../components/PizzaItem";
import PizzaSkeleton from "../components/PizzaSkeleton";

const PizzaList = ({ title }) => {
    // pizza array
    const [pizza, setPizza] = useState([]);

    // getting global value for pizza search
    const { searchValue } = useContext(SearchContext);

    // for skeleton
    const [isLoading, setIsLoading] = useState(true);

    // global state for sort and categories
    const { categoryId, sortType } = useSelector((state) => state.filterSlice);

    // generate empty items for skeleton
    const skeleton = [...new Array(4)].map((_, i) => <PizzaSkeleton key={i} />);

    // show only those pizzas, that match search
    const filteredPizza = pizza
        .filter((item) =>
            searchValue
                ? item.title.toLowerCase().includes(searchValue.toLowerCase())
                : item
        )
        .map((item) => <Pizza key={item.id} {...item} />);

    const currentPage = useSelector((state) => state.filterSlice.page);

    const limit = 4;

    const category = categoryId > 0 ? `category=${categoryId}` : "";

    useEffect(() => {
        setIsLoading(true);

        const sort = sortType.sortProp.replace("-", "");
        const sortOrder = sortType.sortProp.includes("-") ? "asc" : "desc";
        const pageLimit = `&p=${currentPage}&l=${limit}`;
        const searchPizza = searchValue ? "" : pageLimit;

        axios
            .get(
                `https://62a1db14cd2e8da9b0fca398.mockapi.io/pizza?${category}${searchPizza}&sortBy=${sort}&order=${sortOrder}`
            )
            .then((res) => {
                setIsLoading(false);
                setPizza(res.data);
            });

        window.scrollTo(0, 0);
    }, [category, sortType.sortProp, currentPage, searchValue]);

    const nothingFound = (
        <div className="not-found">
            <h1 className="not-found__title">Нічого не знайдено :(</h1>
            <span className="not-found__bottom-text">Спробуйте ще раз</span>
        </div>
    );

    return (
        <div className="container">
            <PizzaFilter />

            <h2 className="content__title">{title}</h2>

            {isLoading ? (
                <div className="content__items">{skeleton}</div>
            ) : !filteredPizza.length ? (
                nothingFound
            ) : (
                <div className="content__items">{filteredPizza}</div>
            )}

            <Pagination category={category} limit={4} />
        </div>
    );
};

export default PizzaList;
