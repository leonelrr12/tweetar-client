import React, { useState, useEffect } from 'react';
import { Spinner, Button } from "react-bootstrap";
import BasicLayout from "../../../layout/BasicLayout";
import { getTweetsFollowersApi } from '../../../api/tweet';
import ListTweets from '../../ListTweets/ListTweets';

import "./Home.scss";

export default function Home(props) {
    const { setCheckLogin } = props;
    const [tweets, setTweets] = useState(null);
    const [page, setPage] = useState(1);
    const [loadingTweets, setLoadingTweets] = useState(false);

    useEffect(() => {
        getTweetsFollowersApi(page).then(response => {
            if(!tweets && response) {
                setTweets(formatModel(response));
            } else {
                if(!response) {
                    setLoadingTweets(0);
                } else {
                    setTweets(...tweets, ...formatModel(response));
                    setLoadingTweets(false);
                }
            }
        }).catch(() => {});
    // eslint-disable-next-line
    }, [page]);

    const moreData = () => {
        setLoadingTweets(true);
        setPage(page + 1);
    };

    return (
        <BasicLayout className="home" setCheckLogin={setCheckLogin}>
            <div className="home__title">
                <h2>Inicio</h2>
            </div>
            {tweets && <ListTweets tweets={tweets} />}
            <Button onClick={moreData} className="load-more">
                {!loadingTweets ? (
                    loadingTweets !== 0 && "Obtener mas Tweets"
                ) : (
                    <Spinner 
                        as="span"
                        animation="grow"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                    />
                )}
            </Button>
        </BasicLayout>
    );
}

function formatModel(tweets) {
    const tweetsTemp = [];
    tweets.forEach(tweet => {
        tweetsTemp.push({
            id: tweet._id,
            userId: tweet.usuarioRelacionID,
            mensaje: tweet.Tweet.mensaje,
            fecha: tweet.Tweet.fecha
        });
    });

    return tweetsTemp;
}