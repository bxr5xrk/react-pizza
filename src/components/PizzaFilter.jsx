import React from "react";
import Categories from "./Categories";
import Sort from "./Sort";

const PizzaFilter = ({categoryId, sortType, setCategoryId, setSortType}) => {

    return (
        <div className="content__top">
                <Categories
                    value={categoryId}
                    onChangeCategory={(id) => setCategoryId(id)}
                />
                <Sort value={sortType} onChangeSort={(id) => setSortType(id)} />
            </div>
    )
}

export default PizzaFilter