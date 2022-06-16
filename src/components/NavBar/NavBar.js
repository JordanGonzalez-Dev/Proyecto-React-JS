import React from "react";
import "./NavBar.css";
import Button from '@mui/material/Button';
import logo from "./img/GamewareLogo.png";
import {CartWidget} from "./CartWidget/CartWidget";


export const NavBar = () => {
    return (
        <header className="gradientAnim">
            <nav className="contenedorNav fadeAnim">
                <div>
                    <a className="logo" href="/#">
                        <img className="voltearLogo" src={logo} alt="logo de productos" />
                    </a>
                </div>
                <ul className="contenedorBotones">
                    <li>
                        <Button variant="contained" color="secondary">Placas de Video</Button>
                    </li>
                    <li>
                        <Button variant="contained" color="secondary">Monitores</Button>
                    </li>
                    <li>
                        <Button variant="contained" color="secondary">Notebooks</Button>
                    </li>
                </ul>
                <div className="iconCart">
                    <CartWidget/>
                </div>
            </nav>
    </header>
    );
};