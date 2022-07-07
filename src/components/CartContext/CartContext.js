import React, { createContext, useState } from "react"

export const CartContext = createContext()

export const CartContextProvider = ({children}) =>{
    
    const [cartItems, setCartItems] = useState([])

    const addToCart = (item) => {
        const exist = cartItems.find(e => e.id === item.id);

        if (exist) {
            setCartItems(
                cartItems.map(e => e.id === item.id ? { ...exist, quantity: exist.quantity + item.quantity} : e) 
            );
        } else {
            setCartItems([...cartItems, item])
            console.log(cartItems)
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
    
    const isInCart = (id) => {
        return cartItems.some(prod => prod.id === id)
    }

    return(
        <CartContext.Provider value={{
            cartItems,
            addToCart,
            emptyCart,
            removeFromCart,
            totalQuantity,
            isInCart
        }}>
            {children}
        </CartContext.Provider>
    )
}