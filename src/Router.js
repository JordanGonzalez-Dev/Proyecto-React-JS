import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { NavBar } from "./common/NavBar/NavBar";
import { HomePage } from "./pages/home/HomePage";
import { ItemListContainer} from "./components/ItemListContainer/ItemListContainer";
// import { AboutPage } from "./pages/about/AboutPage";
// import { ContactPage } from "./pages/contact/ContactPage";
import { ItemDetailContainer } from "./components/ItemDetailContainer/ItemDetailContainer";
import { CartView } from "./components/CartView/CartView";
import { CartContextProvider } from "./context/CartContext/CartContext";
import { Checkout } from "./components/Checkout/Checkout";
import { Footer } from "./common/Footer/Footer";

export const AppRouter = () => {
    return (
        <CartContextProvider>
        <BrowserRouter>
            <NavBar/>
            <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/products" element={<ItemListContainer />} />
            {/* <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} /> */}
            <Route path="/category/:catId" element={<ItemListContainer />}/>
            <Route path="/item/:itemId" element={<ItemDetailContainer/>}/>
            <Route path='/cart' element={<CartView/>}/>
            <Route path='/checkout' element={<Checkout/>}/>
            <Route path="*" element={<Navigate to="/"/>}/>
            </Routes>
            <Footer/>
        </BrowserRouter>
        </CartContextProvider>
    )
}