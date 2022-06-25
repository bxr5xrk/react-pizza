/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
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

    const dispatch = useDispatch();

    const FetchPizza = async () => {
        if (status !== "error") {
            const sort = sortType.sortProp.replace("-", "");
            const sortOrder = sortType.sortProp.includes("-") ? "asc" : "desc";
            const pageLimit = `&p=${currentPage}&l=${limitItemsOnPage}`;
            const searchPizza = searchValue ? "" : pageLimit;

            dispatch(
                fetchPizzaItems({ category, sort, sortOrder, searchPizza })
            );
        }
    };

    // get pizza from server
    useEffect(() => {
        FetchPizza();

        window.scrollTo(0, 0);
    }, [category, sortType, currentPage, searchValue]);

    ReadAndWriteQueryString(categoryId, currentPage, sortType);

    // block if nothing found
    const nothingFound = (titleText, bottomText) => (
        <div className="not-found">
            <h1 className="not-found__title">{titleText}</h1>
            <span className="not-found__bottom-text">{bottomText}</span>
        </div>
    );

    return (
        <div className="container">
            {status === "error" ? (
                <>
                    {nothingFound(
                        "Наразі у нас технічні проблеми",
                        "Спобуйте пізніше"
                    )}
                </>
            ) : (
                <>
                    <PizzaFilter />

                    <h2 className="content__title">{title}</h2>

                    {status === "loading" ? (
                        <div className="content__items">{skeleton}</div>
                    ) : !filteredPizza.length ? (
                        nothingFound(
                            "Нічого не знайдено :(",
                            "Спробуйте ще раз"
                        )
                    ) : (
                        <div className="content__items">{filteredPizza}</div>
                    )}
                    <Pagination category={category} limit={limitItemsOnPage} />
                </>
            )}
        </div>
    );
};

export default PizzaList;
