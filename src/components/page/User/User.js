import React, { useState, useEffect } from 'react';
import { Button, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import useAuth from "../../../hooks/useAuth";
import { withRouter } from "react-router-dom";
import BasicLayout from "../../../layout/BasicLayout";
import BannerAvatar from "../../../components/user/bannerAvatar";
import InfoUser from "../../../components/user/infoUser";
import ListTweets from "../../../components/ListTweets";
import { getUserApi } from "../../../api/user";
import { getUserTweetApi } from '../../../api/tweet';

import "./User.scss";

function User(props) {
    
    const logedUser = useAuth();
    const { match, setCheckLogin } = props;
    const { params } = match;
    const [user, setUser] = useState(null);
    const [tweets, setTweets] = useState(null);
    const [page, setPage] = useState(1);
    const [loadingTweets, setLoadingTweets] = useState(false);

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

    useEffect(() => {
        getUserTweetApi(params.id, 1)
            .then(response => {
                setTweets(response);
            })
            .catch(err => {
                setTweets([]);
            });
    }, [params]);

    const moreData = () => {
        const pageTmp = page + 1;
        setLoadingTweets(true);

        getUserTweetApi(params.id, pageTmp).then(response => {
            if(!response) {
                setLoadingTweets(0);
            } else {
                setTweets([...tweets, ...response]);
                setPage(pageTmp);
                setLoadingTweets(false);
            }
        });
    };
 
    return (
        <BasicLayout setCheckLogin={setCheckLogin}>
            <div className="user__title"> 
                <h2>
                    { user ? `${user.Nombre} ${user.Apellidos}` : "Este usuario no exuste."}</h2>
            </div>  
            <BannerAvatar user={user} logedUser={logedUser}/>
            <InfoUser user={user}/>
            <div className="user__tweets">
                <h3>Tweets</h3>
                {tweets && <ListTweets tweets={tweets}/>}
                <Button onClick={moreData}>
                    {!loadingTweets ? (
                        loadingTweets !== 0 && 'Obtener más tweets'
                    ) : (
                        <Spinner
                            as="span"
                            animation="grow"
                            size="sm"
                            role="status"
                            arian-hidden="true"
                        />
                    )}
                </Button>
            </div>
        </BasicLayout>
    );
}

export default withRouter(User);
