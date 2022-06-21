/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Pagination from "../components/Pagination/Pagination";
import PizzaFilter from "../components/PizzaFilter";
import Pizza from "../components/PizzaItem";
import PizzaSkeleton from "../components/PizzaSkeleton";
import { fetchPosts, ReadAndWriteQueryString } from "../API/PizzaService";

const PizzaList = ({ title }) => {
    // pizza array
    const [pizza, setPizza] = useState([]);

    // global state for sort and categories
    const { categoryId, sortType, searchValue, currentPage } = useSelector(
        (state) => state.filterSlice
    );

    // for skeleton
    const [isLoading, setIsLoading] = useState(true);

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

    const limitItemsOnPage = 4;

    // for display category 'Всі'
    const category = categoryId > 0 ? `category=${categoryId}` : "";

    const [isSearch, setIsSearch] = useState(false);

    ReadAndWriteQueryString(setIsSearch, categoryId, currentPage, sortType);

    // get pizza from server
    useEffect(() => {
        if (!isSearch) {
            fetchPosts(
                setIsLoading,
                sortType,
                currentPage,
                limitItemsOnPage,
                searchValue,
                category,
                setPizza
            );
        }

        setIsSearch(false);
        window.scrollTo(0, 0);
    }, [category, sortType, currentPage, searchValue]);

    // block if nothing found
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

            <Pagination category={category} limit={limitItemsOnPage} />
        </div>
    );
};

export default PizzaList;
