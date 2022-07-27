import React, { useEffect, useState } from "react";
import { ItemDetail } from "../ItemDetail/ItemDetail";
import { Spinner } from "../../helpers/Spinner/Spinner";
import { useParams } from "react-router-dom";
import { doc, getDoc } from 'firebase/firestore/lite';
import { dataBase } from "../../firebase/config/dataBase";
import { Filter } from "../Filter/Filter";

export const ItemDetailContainer = () => {
    const [spinner, setSpinner] = useState(true);
    const [item, setItem] = useState({});
    const {itemId} = useParams();

    useEffect(() => {
        const productsDocument = doc(dataBase, 'Productos', itemId)

        getDoc(productsDocument)
            .then((doc) => {
                setItem({
                    id: doc.id,
                    ...doc.data()
                })
            })
            .catch(error => {console.log("Error: " + error)})
            .finally(() => {setSpinner(false)})
    },[itemId])

    return (
        <>
            <Filter/>
            <section id="spinner">
                {
                    spinner ? <Spinner/> : <ItemDetail item={item}/>
                }
            </section>
        </>
    )
}