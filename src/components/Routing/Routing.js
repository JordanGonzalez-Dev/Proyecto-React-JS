import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { NavBar } from "../NavBar/NavBar";
import { ItemListContainer } from "../ItemListContainer/ItemListContainer";
import { ItemDetailContainer } from "../ItemDetailContainer/ItemDetailContainer";
import { CartView } from "../CartView/CartView";

export const AppRouting = () => {
    return (
        <BrowserRouter>
            <NavBar/>
            <Routes>
            <Route path="/" element={<ItemListContainer/>}/>
            <Route path="/category/:catId" element={<ItemListContainer />}/>
            <Route path="/item/:itemId" element={<ItemDetailContainer/>}/>
            <Route path="*" element={<Navigate to="/"/>}/>
            <Route path='/cart' element={<CartView/>}/>
            </Routes>
        </BrowserRouter>
    )
}