import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addPizzaToCart } from "../store/slices/cartSlice";
import { selectPizza } from "../store/slices/pizzaSlice";
import PizzaSizeAndTypes from "./PizzaSizeAndTypes";

const Pizza = ({ id, title, price, image, sizes, pizzaType }) => {
    const dispatch = useDispatch();
    const [sizeActive, setSizeActive] = useState(0);
    const [typeActive, setTypeActive] = useState(0);

    const cartItem = useSelector((state) =>
        state.cartSlice.pizzaItemsCart.find((obj) => id === obj.id)
    );

    const countItems = cartItem ? cartItem.count : 0;

    const { pizzaEdges } = useSelector(selectPizza);

    const onClickAddPizza = () => {
        const pizzaItem = {
            id,
            title,
            price,
            image,
            size: sizes[sizeActive],
            pizzaType: pizzaEdges[typeActive],
        };
        dispatch(addPizzaToCart(pizzaItem));
    };

    return (
        <div className="pizza-block__wrapper">
            <div className="pizza-block">
                <Link to={`/pizza/${id}`}>
                    <img
                        className="pizza-block__image"
                        src={image}
                        alt="Pizza"
                    />
                    <h4 className="pizza-block__title">{title}</h4>
                </Link>
                <PizzaSizeAndTypes
                    sizes={sizes}
                    pizzaTypes={pizzaType}
                    sizeActive={sizeActive}
                    setSizeActive={setSizeActive}
                    typeActive={typeActive}
                    setTypeActive={setTypeActive}
                    pizzaEdges={pizzaEdges}
                />

                <div className="pizza-block__bottom">
                    <div className="pizza-block__price">{price} грн</div>
                    <div
                        className="button button--outline button--add"
                        onClick={onClickAddPizza}
                    >
                        <svg
                            width="12"
                            height="12"
                            viewBox="0 0 12 12"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                                fill="white"
                            />
                        </svg>
                        <span>Добавити</span>
                        {countItems > 0 && <i>{countItems}</i>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Pizza;
