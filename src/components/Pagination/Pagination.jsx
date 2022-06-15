import React from "react";
import st from "./Pagination.module.scss";

const Pagination = ({ itemsCount, limit, onChangePage, currentPage }) => {
    const pages = Math.ceil(itemsCount / limit);

    return (
        <div className={st.pagination}>
            {currentPage > 1 ? (
                <span
                    className={st.page}
                    onClick={() => onChangePage(currentPage - 1)}
                >
                    {"<"}
                </span>
            ) : (
                ""
            )}

            {pages > 1 &&
                [...new Array(pages)].map((_, p) => (
                    <span
                        onClick={() => onChangePage(p + 1)}
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
                    onClick={() => onChangePage(currentPage + 1)}
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
