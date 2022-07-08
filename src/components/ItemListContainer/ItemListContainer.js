import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ItemListContainer.css";
import { ItemList } from "../ItemList/ItemList";
import { Spinner } from "../Spinner/Spinner";
import { collection, getDocs, query, where } from 'firebase/firestore/lite';
import { dataBase } from "../utils/Firebase/dataBase";

export const ItemListContainer = (props) => {
    const {texto} = props;
    const [items, setItems] = useState([]);
    const {catId} = useParams();

    useEffect(() => {
        const productsCollection = collection(dataBase, 'Productos');

        const q = catId ? query((productsCollection), where('category', '==', catId)) : productsCollection;

        getDocs(q)
            .then((collection) => {
                const items = collection.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                }))
                setItems(items);
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