import React from 'react';
import { Link } from "react-router-dom";
import Error404Image from "../../../assets/png/error-404.png";
import Logo from "../../../assets/png/logo.png";

import "./E404.scss";

export default function E404() {
    return (
        <div className="error404">
            <img src={Logo} alt="Twittar" />
            <img src={Error404Image} alt="Error 404 !!!" />
            <Link to="/">Volver al Inicio</Link>
        </div>        
    );
}
