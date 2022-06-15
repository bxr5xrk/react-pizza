import React from "react";
import Categories from "./Categories";
import Sort from "./Sort";

const PizzaFilter = ({
    categoryId,
    sortType,
    setCategoryId,
    setSortType,
    setCurrentPage,
}) => {
    return (
        <div className="content__top">
            <Categories
                value={categoryId}
                onChangeCategory={(id) => setCategoryId(id)}
                setCurrentPage={setCurrentPage}
            />
            <Sort value={sortType} onChangeSort={(id) => setSortType(id)} />
        </div>
    );
};

export default PizzaFilter;
