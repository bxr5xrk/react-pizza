import React from "react";

const Categories = ({ value, onChangeCategory, setCurrentPage }) => {
    const pizzaCategories = [
        "Всі",
        "М'ясні",
        "Вегетеріанські",
        "Гриль",
        "Гострі",
        "Закриті",
    ];

    const onChangeValue = (i) => {
        onChangeCategory(i);
        setCurrentPage(1);
    };

    return (
        <div className="categories">
            <ul>
                {pizzaCategories.map((category, i) => (
                    <li
                        onClick={() => onChangeValue(i)}
                        className={value === i ? "active" : ""}
                        key={i}
                    >
                        {category}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Categories;
