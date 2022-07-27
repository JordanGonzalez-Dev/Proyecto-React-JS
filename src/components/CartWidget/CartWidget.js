import React, { useContext } from "react";
import "./CartWidget.css";
import iconCart from "../../assets/img/cart.svg";
import { Link } from "react-router-dom";
import { CartContext } from "../../context/CartContext/CartContext";

export const CartWidget = () => {

    const {totalQuantity, cartItems} = useContext(CartContext);

    return (
        <Link to="cart" className={cartItems.length ? "iconCart" : "hiddenIconCart"}>
            <img src={iconCart} alt="logo de carrito"/>
            <span>{totalQuantity()}</span>
        </Link>
    );
};