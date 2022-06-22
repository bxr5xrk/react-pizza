/* eslint-disable react-hooks/exhaustive-deps */
// import axios from "axios";
import QueryString from "qs";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { sortTypes } from "../components/Sort";
import { setSearch } from "../store/slices/filterSlice";
// import { setPizzaItems } from "../store/slices/pizzaSlice";

// export const FetchPizza = async (
//     setIsLoading,
//     sortType,
//     currentPage,
//     limitItemsOnPage,
//     searchValue,
//     category,
// ) => {
//     setIsLoading(true);
//     const dispatch = useDispatch()

//     const sort = sortType.sortProp.replace("-", "");
//     const sortOrder = sortType.sortProp.includes("-") ? "asc" : "desc";
//     const pageLimit = `&p=${currentPage}&l=${limitItemsOnPage}`;
//     const searchPizza = searchValue ? "" : pageLimit;

//     try {
//         const res = await axios.get(
//             `https://62a1db14cd2e8da9b0fca398.mockapi.io/pizza?${category}${searchPizza}&sortBy=${sort}&order=${sortOrder}`
//         );
//         dispatch(setPizzaItems(res.data));
//     } catch (err) {
//         console.log(err);
//     } finally {
//         setIsLoading(false);
//     }
// };

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
    }, []);

    // make query string if vlues changed
    useEffect(() => {
        if (isMounted) {
            const queryString = QueryString.stringify({
                currentPage,
                categoryId,
                sortProp: sortType.sortProp,
            });
            navigate(`?${queryString}`);
        }
        setIsMounted(true);
    }, [categoryId, currentPage, sortType]);
};
