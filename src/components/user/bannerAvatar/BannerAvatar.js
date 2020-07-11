import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import ConfigModal from "../../modal/configModal";
import AvatarNoFound from "../../../assets/png/avatar-no-found.png";
import EditPerfil from "../editPerfil/EditPerfil";
import { API_HOST } from "../../../utils/constants";
import { checkFollowApi, followUserApi, unFollowUserApi } from "../../../api/follow";

import "./BannerAvatar.scss";

export default function BannerAvatar(props) {

    const { user, logedUser } = props;
    const [showModal, setShowModal] = useState(null);
    const [following, setFollowing] = useState(null);
    const [reloadFollow, setReloadFollow] = useState(false);

    const bannerUrl = user?.Banner 
        ? `${API_HOST}/obtenerbanner?id=${user.id}` 
        : null;
    const avatarUrl = user?.Avatar 
        ? `${API_HOST}/obteneravatar?id=${user.id}` 
        : AvatarNoFound;

    useEffect(() => {
        if(user) {             
            checkFollowApi(user?.id).then(response => {
                if(response?.status) {
                    setFollowing(true);
                } else {
                    setFollowing(false);
                }
            });
        };
        setReloadFollow(false);
    }, [user, reloadFollow]);

    const onFollow = () => {
        followUserApi(user.id).then(() => {
            setReloadFollow(true);
        });
    };

    const onUnFollow = () => {
        unFollowUserApi(user.id).then(() => {
            setReloadFollow(true);
        });
    };    

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
                    {logedUser._id === user.id && 
                        <Button onClick={() => setShowModal(true)}>Editar perfil</Button>
                    }

                    {logedUser._id !== user.id && 
                        following !== null && 
                        (following ? (
                            <Button 
                                onClick={onUnFollow} 
                                className="unfollow"
                                >
                            <span>Seguiendo</span></Button>
                        ) : (
                            <Button onClick={onFollow}>Seguir</Button>
                    ))}
                </div>
            )}

            <ConfigModal show={showModal} setShow={setShowModal} title="Editar perfil">
                <EditPerfil user={user} setShowModal={setShowModal}/>
            </ConfigModal>
        </div>
    );
}
