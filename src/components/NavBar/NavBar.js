import React from "react";
import "./NavBar.css";
import Button from '@mui/material/Button';
import logo from "../img/GamewareLogo.png";


export const NavBar = () => {
    return (
        <header class="gradientAnim">
            <nav class="contenedorNav fadeAnim">
                <div>
                    <a class="logo" href="none">
                        <img class="voltearLogo" src={logo} alt="logo de productos" />
                    </a>
                </div>
                <ul class="contenedorBotones">
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
            </nav>
    </header>
    );
};