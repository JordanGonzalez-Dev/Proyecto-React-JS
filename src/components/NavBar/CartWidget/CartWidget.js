import React from "react";
import "./CartWidget.css";
import iconCart from "./img/cart.svg";
import { Link } from "react-router-dom";

export const CartWidget = () => {
    return (
        <Link to="cart">
            <img src={iconCart} alt="logo de carrito"/>
        </Link>
    );
};