import React, { useContext, useState } from "react";
import "./ItemDetail.css";
import { ItemCount } from "../ItemCount/ItemCount";
import { CartContext } from "../../context/CartContext/CartContext";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

export const ItemDetail = ({item}) => {

    const {addToCart, cartItems} = useContext(CartContext);

    const [quantity, setQuantity] = useState(null);
    
    function onAdd(quantity) {
        setQuantity(quantity);

        if (quantity > 0) {
            addToCart({quantity, ...item})
        }
    }

    const inCart = cartItems.find(p => p.id === item.id);

    const update= ()=> {
        if (inCart) {
            const updateStock = inCart.stock - inCart.quantity; 
            return updateStock;
        }
    }
    
    return (
        <>
            <div key={item.id} className="contenedorItemDetail">
                <div className="contenedorImg">
                    <img src={item.pictureUrl} alt={item.alt}></img>
                </div>
                <div className="contenedorDetalles">
                    <h1>{item.title}</h1>
                    {
                        !quantity ? 
                        <>
                        <h2>$ {item.price}</h2>
                        {inCart ? <p>Hay disponibles: {update()} unidades.</p> 
                        : <p>Hay disponibles: {item.stock} unidades.</p>}
                        <ItemCount stock={item.stock} initial={1} onAdd={onAdd} updateStock={update()}/>
                        </> : 
                        <Link to="/cart">
                            <Button variant="contained" color="secondary">{`Ir al Carrito (Cantidad: ${quantity})`}</Button>
                        </Link>
                    }
                </div>
            </div>
        </>
    )
}