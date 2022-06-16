import React from "react";
import Categories from "./Categories";
import PizzaSearch from "./Search/PizzaSearch";
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
             <PizzaSearch />

            <div>
                <Categories
                    value={categoryId}
                    onChangeCategory={(id) => setCategoryId(id)}
                    setCurrentPage={setCurrentPage}
                />
                <Sort value={sortType} onChangeSort={(id) => setSortType(id)} />
            </div>

           
        </div>
    );
};

export default PizzaFilter;
