import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import st from "./Pagination.module.scss";
import { onChangePage } from "../../store/slices/filterSlice";

const Pagination = ({ category, limit }) => {
    const [totalPages, setTotalPages] = useState();

    // get pizza count in selected category
    useEffect(() => {
        fetch(`https://62a1db14cd2e8da9b0fca398.mockapi.io/pizza?${category}`)
            .then((res) => res.json())
            .then((arr) => {
                setTotalPages(arr.length);
            });
    }, [category]);

    const pages = Math.ceil(totalPages / limit);

    const currentPage = useSelector((state) => state.filterSlice.page);
    const dispatch = useDispatch();
    const changePage = (page) => dispatch(onChangePage(page));

    return (
        <div className={st.pagination}>
            {currentPage > 1 ? (
                <span
                    className={st.page}
                    onClick={() => changePage(currentPage - 1)}
                >
                    {"<"}
                </span>
            ) : (
                ""
            )}

            {pages > 1 &&
                [...new Array(pages)].map((_, p) => (
                    <span
                        onClick={() => changePage(p + 1)}
                        className={
                            p + 1 === currentPage
                                ? `${st.page} ${st.page__selected}`
                                : st.page
                        }
                        key={p}
                    >
                        {p + 1}
                    </span>
                ))}

            {currentPage < pages ? (
                <span
                    className={st.page}
                    onClick={() => changePage(currentPage + 1)}
                >
                    {">"}
                </span>
            ) : (
                ""
            )}
        </div>
    );
};

export default Pagination;
