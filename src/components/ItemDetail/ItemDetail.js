import { Button } from "@mui/material";
import React from "react";
import "./ItemDetail.css";
import pictureUrl from "../utils/img/msi3070.png"
import { ItemCount } from "../ItemCount/ItemCount";

export const ItemDetail = ({item}) => {
    return (
        <>
            <div className="contenedorItemDetail">
                <div className="contenedorImg">
                    <img src={pictureUrl} alt="Imagen del producto"></img>
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