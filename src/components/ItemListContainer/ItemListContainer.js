import React from "react";
import "./ItemListContainer.css";

export const ItemListContainer = (props) => {
    const {texto} = props;
    return (
        <section className="text">
            <h1> {texto} </h1> 
        </section>
    );
};