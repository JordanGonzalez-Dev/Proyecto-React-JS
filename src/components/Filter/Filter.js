import React from "react";
import { Link } from "react-router-dom";
import "./Filter.css";

export const Filter = () => {
    return (
        <div>
            <ul className="contenedorBtnFilter btnFilter">
                    <li>
                        <Link className="btnFilter" to="/category/Placas de Video">Placas de Video</Link>
                    </li>
                    <li>
                        <Link className="btnFilter" to="/category/Monitores">Monitores</Link>
                    </li>
                    <li>
                        <Link className="btnFilter" to="/category/Notebooks">Notebooks</Link>
                    </li>
                </ul>
        </div>
    )
}