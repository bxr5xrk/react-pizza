import React, { useState } from "react";

const PizzaSizeAndTypes = ({ sizes, pizzaTypes }) => {
    const [sizeActive, setSizeActive] = useState(0);
    const [typeActive, setTypeActive] = useState(0);
    const pizzaEdges = ["Звичайний", "Сирний"];

    return (
        <div className="pizza-block__selector">
            <ul>
                {sizes.map((size, i) => (
                    <li
                        onClick={() => setSizeActive(i)}
                        className={sizeActive === i ? "active" : ""}
                        key={i}
                    >
                        {size} см.
                    </li>
                ))}
            </ul>

            <p className="edges">Бортик</p>
            <ul>
                {pizzaTypes.map((type, i) => (
                    <li
                        onClick={() => setTypeActive(i)}
                        className={typeActive === i ? "active" : ""}
                        key={i}
                    >
                        {pizzaEdges[type]}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PizzaSizeAndTypes;
