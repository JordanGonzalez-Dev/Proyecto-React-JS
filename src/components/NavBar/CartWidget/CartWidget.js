import React from "react";
import "./CartWidget.css";
import iconCart from "./img/cart.svg";

export const CartWidget = () => {
    return (
        <a href="none">
            <img src={iconCart} alt="logo de carrito"/>
        </a>
    );
};