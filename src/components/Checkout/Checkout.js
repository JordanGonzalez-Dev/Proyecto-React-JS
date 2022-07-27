import { useContext, useState} from "react";
import { CartContext } from "../../context/CartContext/CartContext";
import { dataBase } from "../../firebase/config/dataBase";
import { collection, Timestamp, getDoc, writeBatch, addDoc, doc } from "firebase/firestore/lite";
import "./Checkout.css";
import { Button } from "@mui/material";
import { validate, regex } from "../../utils/validationForm";

export const Checkout = () => {
    const {cartItems, totalPrice, emptyCart} = useContext(CartContext);

    const [orderId, setOrderId] = useState();
    const [outOfStock, setOutOfStock] = useState([]);
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
    
            const batch = writeBatch(dataBase);
    
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
                            setOutOfStock(outOfStock(producto));
                        }
    
                        if (outOfStock.length === 0) {
                            addDoc(collection(dataBase, "Orders"), purchaseOrder)
                                .then(({ id }) => {
                                    setOrderId(id);
                                    batch.commit()
                                })
                                .catch((err) => {
                                console.log(err);
                                });
                                setOrderId(orderId);
                                emptyCart()
                        } else {
                            let mensaje = "";
                            for (const producto of outOfStock) {
                                mensaje += `${producto.title}`;
                            }
                            console.log(`No hay stock suficiente para los siguientes productos: ${mensaje}`);
                        }
                    }
                )
            })
        }
    }

    return (
        <>
            {
                orderId
                ? <section>
                    <h1>Gracias por tu compra!</h1>
                    <h2>ID de compra: {orderId}</h2>
                </section>
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