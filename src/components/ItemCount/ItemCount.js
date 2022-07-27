import React, { useState } from "react";
import "./ItemCount.css"
import Button from '@mui/material/Button';

export const ItemCount = ({stock, initial, onAdd, updateStock}) => {

    const [count, setCount] = useState(initial);
    console.log("count:" + count );
    
    function add () {
        if (count < stock) {
            setCount (count + 1)
        }
    }

    function subs () {
        if (count > 0) {
            setCount (count - 1)
        }
    }

    return (
        <div className="divBtn">
            <Button onClick={subs} variant="contained" color="error" disabled={count===1}>-</Button>

            <span>{count}</span>

            <Button onClick={add} variant="contained" color="success" disabled={count === updateStock}>+</Button>

            <Button onClick={() => onAdd(count)} variant="contained" disabled={count > stock}>Agregar al carrito</Button>
        </div>
    )
}