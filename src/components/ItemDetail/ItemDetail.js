import React, { useState } from "react";
import "./ItemDetail.css";
import { ItemCount } from "../ItemCount/ItemCount";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

export const ItemDetail = ({item}) => {

    const [count, setCount] = useState(1);
    const [added, setAdded] = useState(false);

    const response = () => {
        if (count > 0) {
            setAdded(true)
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
                        !added ? 
                        <>
                        <h2>$ {item.price}</h2>
                        <p>Hay disponibles: {item.stock} unidades.</p>
                        <ItemCount stock={item.stock} count={count} setCount={setCount} onAdd={response}/>
                        </> : <Link to="/cart"><Button variant="contained" color="secondary">Finalizar compra</Button></Link>
                    }
                </div>
            </div>
        </>
    )
}