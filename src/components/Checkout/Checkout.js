import { useContext, useState } from "react";
import { CartContext } from "../CartContext/CartContext";
import { dataBase } from "../utils/Firebase/dataBase";
import { collection, Timestamp, getDoc, writeBatch, addDoc, doc } from "firebase/firestore/lite";
import "./Checkout.css";
import { Button } from "@mui/material";
import exclamationTriangle from "./img/exclamation-triangle.svg";
// import Swal from "sweetalert2";
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

        const batch = writeBatch(dataBase);
        const outOfStock = [];

        cartItems.forEach((productoEnCart) => {
            getDoc(doc(dataBase, "Productos", productoEnCart.id)).then(
                async (documentSnapshot) => {
                    const producto = {
                    ...documentSnapshot.data(),
                    id: documentSnapshot.id,
                    };

                    if (producto.stock >= productoEnCart.quantity) {
                        batch.update(doc(dataBase, "Productos", producto.id), {
                            stock: producto.stock - productoEnCart.quantity,
                        });
                    } else {
                        outOfStock.push(producto);
                    }

                    if (outOfStock.length === 0) {
                        addDoc(collection(dataBase, "Orders"), purchaseOrder)
                            .then(({ id }) => {
                                setOrderId(id);
                                batch.commit()
                            })
                            .catch((err) => {
                            console.log(err);
                            setOrderId(orderId);
                            emptyCart();
                            });
                    } else {
                        let mensaje = "";
                        for (const producto of outOfStock) {
                            mensaje += `${producto.title}`;
                        }
                        console.log(`No hay stock suficiente para los siguientes productos: ${mensaje}`);
                    }
                }
            );
        });
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