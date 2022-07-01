import React, { createContext, useState } from "react"

export const CartContext = createContext()

export const CartContextProvider = ({children}) =>{
    
    const [carrito, setCarrito] = useState([])

    const agregarAlCarrito = (item) => {
        setCarrito([...carrito, item])
        console.log(carrito)
    }
    const vaciarCarrito = () => {
        setCarrito([])
    }
    const removerDelCarrito = (id) => {
        setCarrito(carrito.filter(prod => prod.id !==id))
    }
    const totalCantidad = () => {
        return carrito.reduce((acc, prod) => acc + prod.quantity, 0)
    }
    const isInCart = (id) => {
        return carrito.some(prod => prod.id === id)
    }

    return(
        <CartContext.Provider value={{
            carrito,
            agregarAlCarrito,
            vaciarCarrito,
            totalCantidad,
            removerDelCarrito,
            isInCart
        }}>
            {children}
        </CartContext.Provider>
    )
}