import React from "react";
import "./NavBar.css";
import logo from "./img/GamewareLogo.png";
import { CartWidget } from "./CartWidget/CartWidget";
import { Link } from "react-router-dom";

export const NavBar = () => {
    return (
        <header className="gradientAnim">
            <nav className="contenedorNav fadeAnim">
                <div>
                    <Link to="/" className="logo">
                        <img className="voltearLogo" src={logo} alt="logo de gameware" />
                    </Link>
                </div>
                <ul className="contenedorBotones btnNavBar">
                    <li>
                        <Link className="btnNavBar" to="category/Placas de Video">Placas de Video</Link>
                    </li>
                    <li>
                        <Link className="btnNavBar" to="category/Monitores">Monitores</Link>
                    </li>
                    <li>
                        <Link className="btnNavBar" to="category/Notebooks">Notebooks</Link>
                    </li>
                </ul>
                <div className="iconCart">
                    <CartWidget/>
                </div>
            </nav>
    </header>
    );
};