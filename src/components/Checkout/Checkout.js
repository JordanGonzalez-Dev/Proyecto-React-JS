import { useContext, useState } from "react";
import { CartContext } from "../CartContext/CartContext";
import { dataBase } from "../utils/Firebase/dataBase";
import { collection, Timestamp, addDoc, FieldValue} from "firebase/firestore/lite";
import "./Checkout.css";
import { Button } from "@mui/material";
import exclamationTriangle from "./img/exclamation-triangle.svg";
// import { validationUserInput } from "../utils/Firebase/validationUserInput";
// import Swal from "sweetalert2";

export const Checkout = () => {
    const {cartItems, totalPrice, emptyCart} = useContext(CartContext);
    const [orderId, setOrderId] = useState();

    const  [userInput, setUserInput] = useState({
        nombre: "",
        phone: "",
        email: ""
    })

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
                setOrderId(response.id);
            })
            .catch(error => {console.log("Error: " + error)});
            setOrderId(orderId);
            emptyCart();

        // ACA TRATO DE RESTAR -1 EN EL STOCK

        const orderRef = dataBase.collection('Productos').doc({cartItems});

        const decrement = orderRef.update({
            stock: FieldValue.increment(-1)
        });
        
        decrement();
            
        // if (orderId) {
        //     Swal.fire({
        //         icon: 'success',
        //         title: 'Su orden ha sido registrada',
        //         text: `Su numero de orden es ${orderId}`,
        //         showConfirmButton: true,
        //         confirmButtonText: 'Acepto!'
        //     }).then((orderId) => {
        //         if (orderId.isConfirmed) {
        //             emptyCart();  
        //         }
        //     })
        // }
    }

    return (
        <>
            {
                orderId
                ? <h1>ID de compra: {orderId}</h1>
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