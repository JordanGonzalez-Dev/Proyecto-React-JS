import React from "react";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import "./Item.css";

export const Item = ({id, title, alt, price, pictureUrl}) => {
    return (
        <>
            <Card className="card">
                <CardMedia
                    component="img"
                    image={pictureUrl}
                    alt={alt}
                />
                <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    $ {price}
                </Typography>
                </CardContent>
                <ul className="btnVerMas">
                    <li>
                        <Link to={`/item/${id}`}>Ver más</Link>
                    </li>
                </ul>
            </Card>
        </>
    );
}