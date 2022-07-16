import { useContext, useState } from "react";
import { CartContext } from "../CartContext/CartContext";
import { Navigate } from "react-router-dom";
import { dataBase } from "../utils/Firebase/dataBase";
import { collection, Timestamp, addDoc } from "firebase/firestore/lite";
// import { validationUserInput } from "../utils/Firebase/validationUserInput";
import "./Checkout.css";
import { Button } from "@mui/material";
import exclamationTriangle from "./img/exclamation-triangle.svg";
import Swal from "sweetalert2";

export const Checkout = () => {
    const {cartItems, totalPrice, emptyCart} = useContext(CartContext);

    const  [userInput, setUserInput] = useState({
        nombre: "",
        phone: "",
        email: ""
    })

    const [successfulPurchase, setSuccessfulPurchase] = useState([])

    const handleInputChange = (e) => {
        setUserInput({
            ...userInput,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        // Esta función la quiero usar para que cuando meto mal los datos en los input, me avise que es inválido, pero no la terminé
        // validationUserInput(userInput);

        const purchaseOrder = {
            buyer: userInput,
            items: cartItems,
            date: Timestamp.fromDate(new Date()),
            total: totalPrice()
        }
        const orderToCollection = collection(dataBase, "Orders")
        addDoc(orderToCollection, purchaseOrder)
            .then((response) => {
                setSuccessfulPurchase(response.id)
            })
            setSuccessfulPurchase(successfulPurchase);
            console.log("ID compra: " + successfulPurchase);

        if (successfulPurchase.length > 0) {
            Swal.fire({
                icon: 'success',
                title: 'Su orden ha sido registrada',
                text: `Su numero de orden es ${successfulPurchase}`,
                showConfirmButton: true,
                confirmButtonText: 'Acepto!'
            }).then((successfulPurchase) => {
                if (successfulPurchase.isConfirmed) {
                    emptyCart();
                }
            })
        }
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
                        name ="phone"
                        value = {userInput.phone}
                        className=""
                        type="text"
                        placeholder="Teléfono"    
                    />
                    {userInput.phone.length < 4 && <img src={exclamationTriangle} alt="Teléfono inválido"/>}
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