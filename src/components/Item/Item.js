import React from "react";
import Card from "@mui/material/Card";
import CardActions from '@mui/material/CardActions';
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from '@mui/material/Button';
import Typography from "@mui/material/Typography";
import {ItemCount} from "../ItemCount/ItemCount";
import "./Item.css"

export const Item = ({title, description, price, pictureUrl, stock}) => {
    return (
    <Card className="card">
        <CardMedia
            component="img"
            image={pictureUrl}
            alt={description}
        />
        <CardContent>
        <Typography gutterBottom variant="h5" component="div">
            {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
            $ {price}
        </Typography>
        </CardContent>
        <ItemCount stock={stock} initial={1}/>
        <CardActions>
            <Button size="small">Añadir al Carrito</Button>
        </CardActions>
    </Card>
    );
}