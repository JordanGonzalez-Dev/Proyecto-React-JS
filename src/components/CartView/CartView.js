import React, { useContext } from 'react';
import { CartContext } from '../CartContext/CartContext';

export const CartView = () => {

    const {cartItems, emptyCart, removeFromCart, quantity} = useContext(CartContext);

    return (
    <div className='container my-5'>
        <h2>Cart View</h2>
        <hr/>
        <section className="card m-3" style={{ width: '12rem' }}> 
        {
        cartItems.map((prod)=>(
        <div className="card-body">
            <h3 className="card-title">{prod.name}</h3>
            <p className="card-text">Precio: ${prod.price}</p>
            <p className="card-text">Cantidad: {quantity}</p>
            <button onClick={() => {removeFromCart(prod.id)}}>
            Tacho</button>
        </div>
        ))
        }
        </section>
        <hr/>
        <div>
            <button onClick={emptyCart}>Vaciar</button>
            <button>Finalizar</button>
        </div>
    </div>
    )
}