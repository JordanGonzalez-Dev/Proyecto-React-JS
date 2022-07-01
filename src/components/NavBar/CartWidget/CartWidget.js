import React, { useContext } from "react";
import "./CartWidget.css";
import iconCart from "./img/cart.svg";
import { Link } from "react-router-dom";
import { CartContext } from "../../CartContext/CartContext";

export const CartWidget = () => {

    const {totalQuantity} = useContext(CartContext);

    return (
        <Link to="cart">
            <img src={iconCart} alt="logo de carrito"/>
            <span>{totalQuantity("")}</span>
        </Link>
    );
};