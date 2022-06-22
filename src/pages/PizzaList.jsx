/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Pagination from "../components/Pagination/Pagination";
import PizzaFilter from "../components/PizzaFilter";
import Pizza from "../components/PizzaItem";
import PizzaSkeleton from "../components/PizzaSkeleton";
import { ReadAndWriteQueryString } from "../API/PizzaService";
import { useDispatch } from "react-redux";
import { fetchPizzaItems } from "../store/slices/pizzaSlice";

const PizzaList = ({ title }) => {
    // pizza array
    // const [pizza, setPizza] = useState([]);
    const { pizzaItems, status } = useSelector((state) => state.pizzaSlice);

    // global state for sort and categories
    const { categoryId, sortType, searchValue, currentPage } = useSelector(
        (state) => state.filterSlice
    );

    // for skeleton
    // const [isLoading, setIsLoading] = useState(true);

    // generate empty items for skeleton
    const skeleton = [...new Array(4)].map((_, i) => <PizzaSkeleton key={i} />);

    // show only those pizzas, that match search
    const filteredPizza = pizzaItems
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

    const dispatch = useDispatch();

    const FetchPizza = async () => {
        if (!isSearch) {
            if (status !== "error") {
                // setIsLoading(true);

                const sort = sortType.sortProp.replace("-", "");
                const sortOrder = sortType.sortProp.includes("-")
                    ? "asc"
                    : "desc";
                const pageLimit = `&p=${currentPage}&l=${limitItemsOnPage}`;
                const searchPizza = searchValue ? "" : pageLimit;

                // try {
                // const { data } = await axios.get(
                //     `https://62a1db14cd2e8da9b0fca398.mockapi.io/pizza?${category}${searchPizza}&sortBy=${sort}&order=${sortOrder}`
                // );
                dispatch(
                    fetchPizzaItems({ category, sort, sortOrder, searchPizza })
                );
                // } catch (err) {
                //     console.log(err);
                // } finally {
                //     setIsLoading(false);
                // }
            }
        }
    };

    // get pizza from server
    useEffect(() => {
        FetchPizza();

        setIsSearch(false);
        window.scrollTo(0, 0);
    }, [category, sortType, currentPage, searchValue]);

    ReadAndWriteQueryString(setIsSearch, categoryId, currentPage, sortType);

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

            {status === "error" ? (
                <div>ERROR</div>
            ) : (
                <div>
                    {status === "loading" ? (
                        <div className="content__items">{skeleton}</div>
                    ) : !filteredPizza.length ? (
                        nothingFound
                    ) : (
                        <div className="content__items">{filteredPizza}</div>
                    )}
                    <Pagination category={category} limit={limitItemsOnPage} />
                </div>
            )}
        </div>
    );
};

export default PizzaList;
