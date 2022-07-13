import React, { useContext } from 'react';
import { CartContext } from '../CartContext/CartContext';
import { Button } from '@mui/material';
import "./CartView.css";
import { Link } from 'react-router-dom';

export const CartView = () => {

    const {cartItems, emptyCart, removeFromCart, totalPrice} = useContext(CartContext);
    console.log(cartItems);

    return (
    <main>
        <h2>Carrito</h2>
        <section className="cartView"> 
        {
            cartItems.length ?
            cartItems.map((prod)=>(
                    <div key= {prod.id}>
                        <h3 className="">{prod.title}</h3>
                        <p className="">Cantidad: {prod.quantity}</p>
                        <p className="">Precio c/u: ${prod.price}</p>
                        <p className="">Precio total ${totalPrice()}</p>
                        <Button 
                        variant='contained' 
                        color='error' 
                        onClick={() => removeFromCart(prod.id, prod)}
                        >Eliminar</Button>
                    </div>
            ))
            : <h3>No tienes productos en el Carrito, ve a comprar algo!</h3>
        }
        </section>
        {
            cartItems.length ?
            <div className='cartViewBtn'>
                <Button variant='contained' color='secondary' disabled={cartItems.length === 0} onClick={emptyCart}>Vaciar</Button>
                <Link to={"/checkout"}>
                    <Button variant='contained' color='success' disabled={cartItems.length === 0}>Finalizar</Button>
                </Link>
            </div>
            : <Link to={"/"} className="cartViewBtn">
            <Button variant='contained' color='primary'>Volver al catálogo</Button>
            </Link>
        }
        
    </main>
    )
}