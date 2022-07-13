import { useContext, useState } from "react";
import { CartContext } from "../CartContext/CartContext";
import { Navigate } from "react-router-dom";
import { dataBase } from "../utils/Firebase/dataBase";
import { collection, Timestamp, addDoc } from "firebase/firestore/lite";
import { validationUserInput } from "../utils/Firebase/validationUserInput";
import "./Checkout.css";
import { Button } from "@mui/material";
import exclamationTriangle from "./img/exclamation-triangle.svg"

export const Checkout = () => {
    const {cartItems, totalPrice} = useContext(CartContext);

    const  [userInput, setUserInput] = useState({
        nombre: " ",
        apellido: " ",
        email: ""
    })

    const handleInputChange = (e) => {
        setUserInput({
            ...userInput,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (!validationUserInput(userInput)){return}

        const purchaseOrder = {
            buyer: {...userInput},
            items: cartItems,
            date: Timestamp.fromDate(new Date()),
            total: totalPrice()
        }
        const orderToCollection = collection(dataBase, "Orders")
        addDoc(orderToCollection, purchaseOrder)
            .then((response) => {
                console.log(response.id);
            })
    }

    return (
        <>
            {
                cartItems.length === 0
                ? <Navigate to="/"/>
                :
                <>
                    <h2>Resumen de compra</h2>
                    <section className="inputContainer">
                    <form onSubmit={handleSubmit}>
                    <input
                        onChange={handleInputChange}
                        name ="nombre"
                        value = {userInput.nombre}
                        className=""
                        type="text"
                        placeholder="Nombre"    
                    />
                    {userInput.nombre.length < 4 && <img src={exclamationTriangle} alt="Nombre inválido"/>}
                    <input
                        onChange={handleInputChange}
                        name ="apellido"
                        value = {userInput.apellido}
                        className=""
                        type="text"
                        placeholder="Apellido"    
                    />
                    {userInput.apellido.length < 4 && <img src={exclamationTriangle} alt="Apellido inválido"/>}
                    <input
                        onChange={handleInputChange}
                        name ="email"
                        value = {userInput.email}
                        className=""
                        type="email"
                        placeholder="Ingresa tu email"
                    />
                    {userInput.email.length < 4 && <img src={exclamationTriangle} alt="Email inválido"/>}
                    <Button type="submit">Enviar</Button>
                </form>
                </section>
                </>
            }
        </>
    )
}