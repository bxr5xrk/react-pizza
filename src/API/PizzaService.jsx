import axios from "axios";
import QueryString from "qs";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { sortTypes } from "../components/Sort";
import { setSearch } from "../store/slices/filterSlice";

export const fetchPosts = (
    setIsLoading,
    sortType,
    currentPage,
    limitItemsOnPage,
    searchValue,
    category,
    setPizza
) => {
    setIsLoading(true);

    const sort = sortType.sortProp.replace("-", "");
    const sortOrder = sortType.sortProp.includes("-") ? "asc" : "desc";
    const pageLimit = `&p=${currentPage}&l=${limitItemsOnPage}`;
    const searchPizza = searchValue ? "" : pageLimit;

    axios
        .get(
            `https://62a1db14cd2e8da9b0fca398.mockapi.io/pizza?${category}${searchPizza}&sortBy=${sort}&order=${sortOrder}`
        )
        .then((res) => {
            setIsLoading(false);
            setPizza(res.data);
        });
};

export const ReadAndWriteQueryString = (
    setIsSearch,
    categoryId,
    currentPage,
    sortType
) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        if (window.location.search) {
            const params = QueryString.parse(window.location.search.slice(1));

            const sortType = sortTypes.find(
                (i) => i.sortProp === params.sortProp
            );

            dispatch(setSearch({ ...params, sortType }));
            setIsSearch(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (isMounted) {
            const queryString = QueryString.stringify({
                categoryId,
                sortProp: sortType.sortProp,
                currentPage,
            });
            navigate(`?${queryString}`);
        }
        setIsMounted(true);
    }, [categoryId, currentPage, sortType, isMounted, navigate]);
};
