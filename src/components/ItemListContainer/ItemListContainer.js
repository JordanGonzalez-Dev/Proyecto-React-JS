import React, { useEffect, useState } from "react";
import "./ItemListContainer.css";
import { ItemList } from "../ItemList/ItemList";
import { Spinner } from "../../helpers/Spinner/Spinner";
import { useParams } from "react-router-dom";
import { collection, getDocs, query, where } from 'firebase/firestore/lite';
import { dataBase } from "../../firebase/config/dataBase";
import { Filter } from "../Filter/Filter"

export const ItemListContainer = () => {
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
        <section>
            <h1 className="title">Productos</h1>
            <Filter/>
            <article className="containerSection">
                {
                    items.length ? <ItemList products={items}/> : <Spinner/>
                }
            </article>
        </section>
    );
};