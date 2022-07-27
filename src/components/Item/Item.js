import React from "react";
import { Link } from "react-router-dom";
import "./Item.css";

export const Item = ({id, title, alt, price, pictureUrl}) => {
    return (
        <div className="card">
            <img className="card-profile-img" src={pictureUrl} alt={alt}/>
            <div className="card-description-bk"></div>
            <div className="card-description">
                <p>{title}</p>
            </div>
            <div className="card-date">
                <p>$ {price}</p>
            </div>
            <div className="card-btn btnTrans">
                <Link to={`/item/${id}`}>Ver más</Link>
            </div>
        </div>
    );
}