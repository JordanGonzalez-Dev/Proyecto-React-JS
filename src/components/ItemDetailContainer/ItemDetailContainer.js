import React, { useEffect, useState } from "react";
import customFetch from "../utils/customFetch";
import { ItemDetail } from "../ItemDetail/ItemDetail";
import products from "../utils/products";
import { Spinner } from "../Spinner/Spinner";
import { useParams } from "react-router-dom";

export const ItemDetailContainer = () => {
    const [spinner, setSpinner] = useState(true);
    const [item, setItem] = useState({});
    const {itemId} = useParams();

    useEffect(() => {
        customFetch(2000, products)
        .then((response) => {
            setItem(response.find(e => e.id === Number(itemId)))
        })
        .catch(error => {console.log("Error: " + error)})
        .finally(() => {setSpinner(false)})
    },[itemId])

    return (
        <section id="spinner">
            {
                spinner ? <Spinner/> : <ItemDetail item={item}/>
            }
        </section>
    )
}