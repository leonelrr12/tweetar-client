import React, { useState, useEffect } from 'react';
import { Button, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import useAuth from "../../../hooks/useAuth";
import { withRouter } from "react-router-dom";
import BasicLayout from "../../../layout/BasicLayout";
import BannerAvatar from "../../../components/user/bannerAvatar";
import InfoUser from "../../../components/user/infoUser";
import { getUserApi } from "../../../api/user";

import "./User.scss";

function User(props) {

    const { match } = props;
    const { params } = match;
    const [user, setUser] = useState(null);
    const logedUser = useAuth();

    useEffect(() => {
        getUserApi(params.id)
        .then(response => {
            if(!response) toast.warning("El usuario que estas visitando no exsite!");
            setUser(response);
        })
        .catch(() => {
            toast.warning("Error al consultar este usuario!");
        });
    }, [params]);

    return (
        <BasicLayout>
            <div className="user__title"> 
                <h2>
                    { user ? `${user.Nombre} ${user.Apellidos}` : "Este usuario no exuste."}</h2>
            </div>  
            <BannerAvatar user={user} logedUser={logedUser}/>
            <InfoUser user={user}/>
            <div className="user__tweets">Lista de Tweets</div>
        </BasicLayout>
    );
}

export default withRouter(User);
