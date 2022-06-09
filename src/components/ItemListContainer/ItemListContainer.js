import React from "react";
import "./ItemListContainer.css";

export const ItemListContainer = (props) => {
    const {texto} = props;
    return (
        <section className="text">
            <TextComponent textContent={texto}/>
        </section>
    );
};

const TextComponent = props => {
    const {textContent} = props;
    return (
        <>
        <h1> {textContent} </h1>
        </>
    );
};