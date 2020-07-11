import { API_HOST } from "../utils/constants";
import { getTokenApi } from "./auth";

export function addTweetApi(message) {

    const url = `${API_HOST}/tweet`;

    const data = {
        mensaje: message
    };
 
    const params = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getTokenApi()}`
        },
        body: JSON.stringify(data)
    };

    return fetch(url, params)
        .then((response) => {
            if(response.status >= 200 && response.status < 300) {
                return {code: response.status, message: "Tweet enviado."};
            }
            return {code: 500, message: "Error del servidor."};
        })
        .catch((err) => {
            return err;
        });
}

export function getUserTweetApi(idUser, page) {
    const url = `${API_HOST}/leotweets?id=${idUser}&pagina=${page}`;

    const params = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getTokenApi()}`
        }
    };

    return fetch(url, params)
        .then(response => {
            return response.json();
        })
        .catch(err => {
            return err;
        });
}

export function getTweetsFollowersApi(page = 1) {
    const url = `${API_HOST}/listatweetsseguidores?pagina=${page}`;

    const params = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getTokenApi()}`
        }
    };

    return fetch(url, params)
        .then(response => {
            return response.json();
        })    
        .catch(err => {
            return err;
        });
}