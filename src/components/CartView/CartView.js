import React, { useContext } from 'react';
import { CartContext } from '../CartContext/CartContext';
import { Button } from '@mui/material';
import "./CartView.css";

export const CartView = () => {

    const {cartItems, emptyCart, removeFromCart} = useContext(CartContext);
    console.log(cartItems);

    return (
    <main>
        <h2>Cart View</h2>
        <section className="cartView"> 
        {
        cartItems.map((prod)=>(
        
        <div key= {prod.id} className="">
            <h3 className="">{prod.title}</h3>
            <p className="">Precio: ${prod.price}</p>
            <p className="">Cantidad: {prod.quantity}</p>
            <Button variant='contained' color='error' onClick={() => {removeFromCart(prod.id)}}>
            Eliminar</Button>
        </div>
        ))
        }
        </section>
        <hr/>
        <div className='cartViewBtn'>
            <Button variant='contained' color='secondary' onClick={emptyCart}>Vaciar</Button>
            <Button variant='contained' color='success'>Finalizar</Button>
        </div>
    </main>
    )
}