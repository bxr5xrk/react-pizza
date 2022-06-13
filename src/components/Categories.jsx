import React from "react";

const Categories = ({ value, onChangeCategory }) => {
    const pizzaCategories = [
        "Всі",
        "М'ясні",
        "Вегетеріанські",
        "Гриль",
        "Гострі",
        "Закриті",
    ];

    return (
        <div className="categories">
            <ul>
                {pizzaCategories.map((category, i) => (
                    <li
                        onClick={() => onChangeCategory(i)}
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
