import React, { useEffect, useState } from "react";
import "./ItemListContainer.css";
import elFetch from "../utils/elFetch";
import products from "../utils/products";
import { ItemList } from "../ItemList/ItemList";
import { Spinner } from "../Spinner/Spinner";

export const ItemListContainer = (props) => {
    const {texto} = props;
    const [items, setItems] = useState([])
    useEffect(() => {
        elFetch(3000, products)
        .then(resultado => setItems(resultado))
        .catch(error => {console.log("Error: " + error)})
    }, [items]);
    return (
        <>
        <h1 className="text"> {texto} </h1>
        <section className="containerSection">
            {
                items.length ? <ItemList products={items}/> : <Spinner/>
            }
        </section>
        </>
        
    );
};