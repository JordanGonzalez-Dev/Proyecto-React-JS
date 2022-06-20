import React, { useEffect, useState } from "react";
import elFetch from "../utils/elFetch";
import {ItemDetail} from "../ItemDetail/ItemDetail";
import products from "../utils/products";
import { Spinner } from "../Spinner/Spinner";

export const ItemDetailContainer = () => {
    const [spinner, setSpinner] = useState(false)
    const [item, getItem] = useState({});

    useEffect(() => {
        setSpinner(true)
        elFetch(2000, products)
        .then((resultado) => {
            getItem(resultado[0])
        })
        .catch(error => {console.log("Error: " + error)})
        .finally(() => {setSpinner(false)})
    },[])

    return (
        <section id="spinner">
            {
                spinner ? <Spinner/> : <ItemDetail item={item}/>
            }
        </section>
    )
}