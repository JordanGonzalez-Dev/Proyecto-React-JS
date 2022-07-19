import { useContext, useState } from "react";
import { CartContext } from "../CartContext/CartContext";
import { dataBase } from "../utils/Firebase/dataBase";
import { collection, Timestamp, getDocs, writeBatch, query, where, documentId, addDoc } from "firebase/firestore/lite";
import "./Checkout.css";
import { Button } from "@mui/material";
import exclamationTriangle from "./img/exclamation-triangle.svg";
import Swal from "sweetalert2";
// import { validationUserInput } from "../utils/Firebase/validationUserInput";

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Esta función la quiero usar para que cuando meto mal los datos en los input, me avise que es inválido, pero no la terminé
        // validationUserInput(userInput);

        const purchaseOrder = {
            buyer: userInput,
            items: cartItems,
            date: Timestamp.fromDate(new Date()),
            total: totalPrice()
        }

        const batch = writeBatch(dataBase);
        const orderRef = collection(dataBase, "Orders");
        const productosRef = collection(dataBase, "Productos");
        const q = query(productosRef, where(documentId(), 'in', cartItems.map(el => el.id)));

        const outOfStock = [];
        const productos = await getDocs(q);

        productos.docs.forEach((doc)=>{
            const itemToUpdate = cartItems.find((prod)=> prod.id === doc.id)

            if(doc.data().stock >= itemToUpdate.counter){
                batch.update(doc.ref, {
                    stock: doc.data().stock - itemToUpdate.counter
                })
            } else {
                outOfStock.push(itemToUpdate)
                console.log(outOfStock)
            }
        })
        
        if(outOfStock.length > 0){
            addDoc(orderRef, purchaseOrder)
            .then((response) => {
                setOrderId(response.id);
                batch.commit()
            })
            .catch(error => {console.log("Error: " + error)});
                setOrderId(orderId);
                emptyCart();
        } else {
            Swal.fire({
                icon: 'error',
                title: 'No hay stock de los siguientes productos: ',
                text: outOfStock.map(el=> el.name).join(', ')
            })
        }




        // const orderToCollection = collection(dataBase, "Orders")
        // addDoc(orderToCollection, purchaseOrder)
        //     .then((response) => {
        //         setOrderId(response.id);
        //     })
        //     .catch(error => {console.log("Error: " + error)});
        //     setOrderId(orderId);
        //     emptyCart();
            
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