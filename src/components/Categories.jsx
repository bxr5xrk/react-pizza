import React, { useState } from "react";

const Categories = () => {
    const [active, setActive] = useState(0);

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
                        onClick={() => setActive(i)}
                        className={active === i ? "active" : ""}
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
