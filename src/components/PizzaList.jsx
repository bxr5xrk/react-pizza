import React, { useEffect, useState } from "react";
import Pagination from "./Pagination/Pagination";
import PizzaFilter from "./PizzaFilter";
import Pizza from "./PizzaItem";
import PizzaSkeleton from "./PizzaSkeleton";

const PizzaList = ({ title, searchValue }) => {
    // pizza object
    const [pizza, setPizza] = useState([]);

    // for skeleton
    const [isLoading, setIsLoading] = useState(true);

    // global state for sort and categories
    const [categoryId, setCategoryId] = useState(0);
    const [sortType, setSortType] = useState({
        name: "за популярністю",
        sortProp: "rating",
    });

    // generate empty items for skeleton
    const skeleton = [...new Array(4)].map((_, i) => <PizzaSkeleton key={i} />);

    // show only those pizzas, that match search
    const filterPizza = pizza
        .filter((item) =>
            searchValue
                ? item.title.toLowerCase().includes(searchValue.toLowerCase())
                : item
        )
        .map((item) => <Pizza key={item.id} {...item} />);

    const [totalPages, setTotalPages] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const limit = 4;

    // move to other file component in folder API
    useEffect(() => {
        setIsLoading(true);

        const category = categoryId > 0 ? `category=${categoryId}` : "";
        const sort = sortType.sortProp.replace("-", "");
        const sortOrder = sortType.sortProp.includes("-") ? "asc" : "desc";
        const pageLimit = `&p=${currentPage}&l=${limit}`;
        const searchPizza = searchValue ? "" : pageLimit;

        // get pizza from mocapi
        fetch(
            `https://62a1db14cd2e8da9b0fca398.mockapi.io/pizza?${category}${searchPizza}&sortBy=${sort}&order=${sortOrder}`
        )
            .then((res) => res.json())
            .then((arr) => {
                setIsLoading(false);
                setPizza(arr);
            });

        // get pizza count
        fetch(`https://62a1db14cd2e8da9b0fca398.mockapi.io/pizza?${category}`)
            .then((res) => res.json())
            .then((arr) => {
                setTotalPages(arr.length);
            });

        window.scrollTo(0, 0);
    }, [categoryId, sortType, currentPage, totalPages, searchValue]);

    return (
        <div>
            <PizzaFilter
                categoryId={categoryId}
                sortType={sortType}
                setCategoryId={setCategoryId}
                setSortType={setSortType}
                setCurrentPage={setCurrentPage}
            />

            <h2 className="content__title">{title}</h2>

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

            <Pagination
                itemsCount={totalPages}
                limit={4}
                onChangePage={(p) => setCurrentPage(p)}
                currentPage={currentPage}
            />
        </div>
    );
};

export default PizzaList;
