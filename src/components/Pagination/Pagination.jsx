import React from "react";

const Pagination = ({ itemsCount, limit, onChangePage, currentPage }) => {
    const pages = Math.ceil(itemsCount / limit);

    return (
        <div className="pagination">
            {currentPage > 1 ? (
                <span
                    className="page"
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
                                ? "page page-selected"
                                : "page"
                        }
                        key={p}
                    >
                        {p + 1}
                    </span>
                ))}

            {currentPage < pages ? (
                <span
                    className="page"
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
