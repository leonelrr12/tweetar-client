import React from "react";
import { Location, Link, DateBirth } from "../../../utils/icons";

import "./InfoUser.scss";

export default function InfoUser(props) {

    const { user } = props;

    return (
        <div className="info-user">
            <h2 className="name">{user?.Nombre} {user?.Apellidos}</h2>
            <p className="email">{user?.Email}</p>
            {user?.Biografia && <div className="descripcion">{user.Biografia}</div>}
            <div className="">
                {user?.Ubicacion && (
                    <p>
                        <Location />
                        {user.Ubicacion}
                    </p>
                )}
                {user?.SitioWeb && (
                    <a
                        href={user.SitioWeb}
                        alt={user.SitioWeb}
                        target="_blank"
                        rel="noopener noreferrer">
                            <Link /> {user.SitioWeb}
                    </a>
                )}
                {user?.FecNac && (
                    <p>
                        <DateBirth />
                        {user.FecNac}
                    </p>
                )}
            </div>
        </div>
    )
}
