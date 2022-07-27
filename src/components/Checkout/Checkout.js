import { useContext, useState} from "react";
import { CartContext } from "../../context/CartContext/CartContext";
import { collection, Timestamp, addDoc, doc, updateDoc } from "firebase/firestore/lite";
import { getFirestore } from "firebase/firestore/lite";
import "./Checkout.css";
import { Button } from "@mui/material";
import { Navigate } from "react-router-dom";
import { validate, regex } from "../../utils/validationForm";
import Swal from 'sweetalert2';

export const Checkout = () => {
    const {cartItems, emptyCart, totalPrice} = useContext(CartContext);

    const [formValues, setFormValues] = useState({
        name: "",
        phone: "",
        email: ""
    });

    const handleChange = (e) => {
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value
        })
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validate(formValues)) {

            const purchaseOrder = {
                buyer: formValues,
                items: cartItems,
                date: Timestamp.fromDate(new Date()),
                total: totalPrice()
            }
    
            const db = getFirestore();
            const ordersCollection = collection(db, "Orders");
        
            addDoc(ordersCollection, purchaseOrder)
                .then(({ id }) => {
                    Swal.fire({
                        icon: 'success',
                        title: (`Tu ID de compra es: ${id} 
                        Gracias por elegir Gameware!`)
                    })
                });
        
            cartItems.forEach((item) => {
                const docRef = doc(db, "Productos", item.id);
                updateDoc(docRef, { stock: item.stock - item.quantity });
            });
        
            setFormValues({ name: "", phone: "", email: "" });
            emptyCart();
        }
    }

    return (
        <>
            {
                cartItems.length === 0 
                ? <Navigate to="/"/>
                :
                <>
                    <h2>Finalizar compra</h2>
                    <section className="formContainer">
                        <form onSubmit={handleSubmit}>
                        <h3>Ingresa tu datos</h3>
                        <input
                            onChange={handleChange}
                            name ="name"
                            value = {formValues.name}
                            className=""
                            type="text"
                            placeholder="Nombre"    
                        />
                        {!formValues.name && <p>Nombre requerido</p>}
                        <input
                            onChange={handleChange}
                            name ="phone"
                            value = {formValues.phone}
                            className=""
                            type="text"
                            placeholder="Teléfono"    
                        />
                        {
                            !formValues.phone ? <p>Número de Teléfono requerido</p>
                            : formValues.phone.length < 8 ? <p>El número de Teléfono debe tener más de 8 caracteres!</p>
                            : formValues.phone.length > 11 ? <p>El número de Teléfono no puede exceder 11 caracteres!</p>
                            : null
                        }
                        <input
                            onChange={handleChange}
                            name ="email"
                            value = {formValues.email}
                            className=""
                            type="email"
                            placeholder="Email"
                        />
                        {
                            !formValues.email ? <p>Email requerido</p>
                            : !regex.test(formValues.email) ? <p>Email inválido!</p>
                            : null
                        }
                        <Button type="submit">Enviar</Button>
                        </form>
                    </section>
                </>
            }
        </>
            

    )
}