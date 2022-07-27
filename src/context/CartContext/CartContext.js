import React, { createContext, useState, useEffect } from "react"

export const CartContext = createContext()

export const CartContextProvider = ({children}) => {
    
    const [cartItems, setCartItems] = useState(JSON.parse(localStorage.getItem("cartItems")) || []);

    const addToCart = (item) => {
        const exist = cartItems.find(e => e.id === item.id);

        if (exist) {
            setCartItems(
                cartItems.map(e => e.id === item.id ? { ...exist, quantity: exist.quantity + item.quantity} : e) 
            );
        } else {
            setCartItems([...cartItems, item])
        }
    }

    const emptyCart = () => {
        setCartItems([])
    }

    const removeFromCart = (id, item) => {
        const exist = cartItems.find(e => e.id === item.id);

        if (exist.quantity === 1) {
            setCartItems(cartItems.filter(item => item.id !== id))
        } else if (exist.quantity > 1) {
            setCartItems(
                cartItems.map(e => e.id === item.id ? { ...exist, quantity: exist.quantity - 1} : e) 
            );
        }
    }

    const totalQuantity = () => {
        return cartItems.reduce((acc, prod) => acc + prod.quantity, 0)
    }

    const totalPrice = () => {
        return cartItems.reduce((acc, prod) => acc + prod.price * prod.quantity, 0)
    }
    
    const isInCart = (id) => {
        return cartItems.some(prod => prod.id === id)
    }

    useEffect(() => {
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }, [cartItems]);

    return (
        <CartContext.Provider value={{
            cartItems,
            addToCart,
            emptyCart,
            removeFromCart,
            totalQuantity,
            totalPrice,
            isInCart
        }}>
            {children}
        </CartContext.Provider>
    )
}