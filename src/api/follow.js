import { API_HOST } from "../utils/constants";
import { getTokenApi } from "./auth";

export function checkFollowApi(idUser) {
    const url = `${API_HOST}/consultorelacion?id=${idUser}`;

    const params = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${getTokenApi()}`
        }
    };

    return fetch(url, params)
        .then(response => {
            return response.json();
        })
        .then(result => {
            return result;
        })
        .catch(err => {
            return err;
        });
}

export function followUserApi(idUser) {
    const url = `${API_HOST}/insertrelacion?id=${idUser}`;

    const params = {
        method: "POST",
        headers: {
            Authorization: `Bearer ${getTokenApi()}`
        }
    };

    return fetch(url, params)
        .then(response => {
            return response.json();
        })
        .then(result => {
            return result;
        })
        .catch(err => {
            return err;
        });
}

export function unFollowUserApi(idUser) {
    const url = `${API_HOST}/borrorelacion?id=${idUser}`;

    const params = {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${getTokenApi()}`
        }
    };

    return fetch(url, params)
        .then(response => {
            return response.json();
        })
        .then(result => {
            return result;
        })
        .catch(err => {
            return err;
        });
}

export function getFollowsApi(paramsUrl) {
    const url = `${API_HOST}/listausuarios?${paramsUrl}`;

    const params = {
        headers: {
            Authorization: `Bearer ${getTokenApi()}`
        }
    };

    return fetch(url, params)
        .then(response => {
            return response.json();
        })
        .then(result => {
            return result;
        })
        .catch(err => {
            return err;
        });
}