import React from "react";
import "./ItemDetail.css";
import { Button } from "@mui/material";
import { ItemCount } from "../ItemCount/ItemCount";

export const ItemDetail = ({item}) => {
    return (
        <>
            <div key={item.id} className="contenedorItemDetail">
                <div className="contenedorImg">
                    <img src={item.pictureUrl} alt={item.alt}></img>
                </div>
                <div className="contenedorDetalles">
                    <h1>{item.title}</h1>
                    <h2>$ {item.price}</h2>
                    <p>Hay disponibles: {item.stock} unidades.</p>
                    <ItemCount stock={item.stock} initial={1}/>
                    <Button>Agregar al carrito</Button>
                </div>
            </div>
        </>
    )
}