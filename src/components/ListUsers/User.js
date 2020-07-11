import React, { useState, useEffect } from 'react';
import { Media, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { API_HOST } from "../../utils/constants"; 
import { getUserApi } from "../../api/user";
import avatarNoFound from "../../assets/png/avatar-no-found.png";

export default function User(props) {

    const { user } = props;
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        getUserApi(user.id).then(response => {
            setUserInfo(response);
        })
        .catch(() => {
            setUserInfo([]);
        }); 
        
    }, [user]);


    return (
        <Media 
            as={Link} 
            to={`/${user.id}`} 
            className="list-users__user"
        >
            <Image 
                width={64}
                height={64}
                roundedCircle
                className="mr-3"
                src={
                    userInfo?.Avatar
                        ? `${API_HOST}/obteneravatar?id=${user.id}`
                        : avatarNoFound
                }
                alt={`${user.Nombre} ${user.Apellidos}`}
            />
            <Media.Body>
                <h5>
                    {user.Nombre} {user.Apellidos}
                </h5>
                <p>{userInfo?.Biografia}</p>
            </Media.Body>
        </Media>
    );
}
