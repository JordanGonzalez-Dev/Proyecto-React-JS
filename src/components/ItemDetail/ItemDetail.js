import React, { useContext, useState } from "react";
import "./ItemDetail.css";
import { ItemCount } from "../ItemCount/ItemCount";
import { CartContext } from "../CartContext/CartContext";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

export const ItemDetail = ({item}) => {

    const {addToCart, isInCart} = useContext(CartContext);

    const [quantity, setQuantity] = useState(null);
    console.log("quantity:" + quantity );

    function onAdd(quantity) {
        setQuantity(quantity);

        if (quantity > 0) {
            addToCart({...item, quantity})
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
                        !isInCart(item.id) ? 
                        <>
                        <h2>$ {item.price}</h2>
                        <p>Hay disponibles: {item.stock} unidades.</p>
                        <ItemCount stock={item.stock} initial={1} onAdd={onAdd}/>
                        </> : 
                        <Link to="/cart">
                            <Button variant="contained" color="secondary">{`Finalizar compra (Cantidad: ${quantity})`}</Button>
                        </Link>
                    }
                </div>
            </div>
        </>
    )
}