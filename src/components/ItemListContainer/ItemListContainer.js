import React from "react";
import { ItemCount } from "../ItemCount/ItemCount";
import "./ItemListContainer.css";

export const ItemListContainer = (props) => {
    const {texto} = props;
    return (
        <section className="text">
            <h1> {texto} </h1> 
            <ItemCount stock={6} initial={1}/>
        </section>
    );
};