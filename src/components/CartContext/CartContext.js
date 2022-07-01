import React, { createContext, useState } from "react"

export const CartContext = createContext()

export const CartContextProvider = ({children}) =>{
    
    const [cartItems, setCartItems] = useState([])

    const addToCart = (item) => {
        setCartItems([...cartItems, item])
        console.log(cartItems)
    }
    const emptyCart = () => {
        setCartItems([])
    }
    const removeFromCart = (id) => {
        setCartItems(cartItems.filter(prod => prod.id !==id))
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