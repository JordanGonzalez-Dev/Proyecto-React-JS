import React from "react";
import "./Footer.css";
import logo from "../../assets/img/GamewareLogo.png";
import { Link } from "react-router-dom";

export const Footer = () => {
    return (
        <footer className="footerContainer gradientAnim">
            <div>
                <Link to="/" className="logoFooter">
                    <img src={logo} alt="Logo de Gameware" />
                </Link>
                <p>&copy; 2022 - Todos los derechos reservados.</p>
            </div>
        </footer>
    );
};