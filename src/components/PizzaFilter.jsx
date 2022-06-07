import React from "react";
import Categories from "./Categories";
import SortPizza from "./SortPizza";

const PizzaFilter = () => {
    return (
        <div className="content__top">
            <Categories />
            <SortPizza />
        </div>
    );
};

export default PizzaFilter;
