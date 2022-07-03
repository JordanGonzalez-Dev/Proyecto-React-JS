import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ItemListContainer.css";
import customFetch from "../utils/customFetch";
import products from "../utils/products";
import { ItemList } from "../ItemList/ItemList";
import { Spinner } from "../Spinner/Spinner";

export const ItemListContainer = (props) => {
    const {texto} = props;
    const [items, setItems] = useState([]);
    const {catId} = useParams();

    useEffect(() => {
        customFetch(2000, products)
        .then((response) => {
            if (!catId) {
                setItems(response)
            } else {
                setItems(response.filter(e => e.category === catId))
            }
        })
        .catch(error => {console.log("Error: " + error)})
    }, [catId]);

    return (
        <>
        <h1 className="text">{texto}</h1>
        <section className="containerSection">
            {
                items.length ? <ItemList products={items}/> : <Spinner/>
            }
        </section>
        </>
    );
};