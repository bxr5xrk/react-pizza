import React, { useState } from "react";

const Categories = () => {
    const [active, setActive] = useState(0);

    const pizzaCategories = [
        {
            id: 0,
            title: "Всі",
        },
        {
            id: 1,
            title: "М'ясні",
        },
        {
            id: 2,
            title: "Вегетеріанські",
        },
        {
            id: 3,
            title: "Гриль",
        },
        {
            id: 4,
            title: "Гострі",
        },
        {
            id: 5,
            title: "Закриті",
        },
    ];

    return (
        <div className="categories">
            <ul>
                {pizzaCategories.map((i) => (
                    <li
                        onClick={() => setActive(i.id)}
                        className={active === i.id ? "active" : ""}
                        key={i.id}
                    >
                        {i.title}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Categories;
