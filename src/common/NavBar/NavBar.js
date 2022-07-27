import React from "react";
import "./NavBar.css";
import logo from "../../assets/img/GamewareLogo.png";
import productsIcon from "../../assets/img/productoslogo.png"
import contactIcon from "../../assets/img/contactanoslogo.png"
import aboutIcon from "../../assets/img/local-logo.png"
import { CartWidget } from "../../components/CartWidget/CartWidget";
import { Link } from "react-router-dom";

export const NavBar = () => {
    return (
        <header className="gradientAnim">
            <nav className="contenedorNav fadeAnim">
                <div>
                    <Link to="/" className="logo">
                        <img className="voltearLogo" src={logo} alt="Logo de Gameware" />
                    </Link>
                </div>
                <ul className="contenedorBotones btnNavBar">
                    <li>
                        <Link className="btnNavBar" to="/products">
                            <img src={productsIcon} alt="Botón de Productos"></img>
                            <p>Productos</p>
                        </Link>
                    </li>
                    <li>
                        <Link className="btnNavBar" to="/about">
                            <img src={aboutIcon} alt="Botón de Nosotros"></img>
                            <p>Nosotros</p>
                        </Link>
                    </li>
                    <li>
                        <Link className="btnNavBar" to="/contact">
                            <img src={contactIcon} alt="Botón de Contacto"></img>
                            <p>Contacto</p>
                        </Link>
                    </li>
                </ul>
                <div className="contenedorCart">
                    <CartWidget/>
                </div>
            </nav>
    </header>
    );
};



