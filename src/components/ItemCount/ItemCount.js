import React, { useState } from "react";
import "./ItemCount.css"
import Button from '@mui/material/Button';

export const ItemCount = ({stock, initial}) => {
    const [count, setCount] = useState(initial);

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

    function onAdd () {
        console.log({count})
    }

    return (
        <div className="divBtn">
            <Button onClick={() => {subs(); onAdd();}} variant="contained" color="error" disabled={!count}>-</Button>
            <span className="spanBtn">{count}</span>
            <Button onClick={() => {add(); onAdd();}} variant="contained" color="success" disabled={count > stock-1}>+</Button>
        </div>
    )
    
}
