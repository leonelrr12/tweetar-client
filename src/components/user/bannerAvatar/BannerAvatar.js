import React from 'react';
import { Button, Spinner } from "react-bootstrap";
import AvatarNoFound from "../../../assets/png/avatar-no-found.png";
import { API_HOST } from "../../../utils/constants";

import "./BannerAvatar.scss";
import User from '../../page/User/User';

export default function BannerAvatar(props) {

    const { user, logedUser } = props;
    const bannerUrl = user?.Banner ? `${API_HOST}/obtenerbanner?id=${user.id}` : null;
    const avatarUrl = user?.Avatar ? `${API_HOST}/obteneravatar?id=${user.id}` : AvatarNoFound;

    return (
        <div 
            className="banner-avatar"
            style={{ backgroundImage: `url('${bannerUrl}')`}}
            >
            <div className="avatar" 
                style={{ backgroundImage: `url('${avatarUrl}')`}}
            />
            {user && (
                <div className="options">
                    {logedUser._id === user.id && <Button>Editar perfil</Button>}
                    {logedUser._id !== user.id && <Button>Seguir</Button>}
                </div>
            )}
        </div>
    );
}
