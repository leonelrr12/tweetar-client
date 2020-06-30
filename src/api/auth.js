import { API_HOST, TOKEN } from "../utils/constants";
import jwtDecode from "jwt-decode";

export function signUpApi(user) {

    const url = `${API_HOST}/registro`;
    const wkUser = {
        ...user,
        email: user.email.toLowerCase(),
        fecNac: new Date()
    };

    delete wkUser.repeatPassword;

    const params = {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(wkUser)
    };

    return fetch(url, params)
        .then (resp => {
            if(resp.status >= 200 && resp.status < 300){
                return resp.json();
            }
            return {code: 404, mensaje: "Email no disponible."};
        })
        .then(res => {
            return res;
        })
        .catch(err => {
            return err;
        });
}

export function signInApi(user) {

    const url = `${API_HOST}/login`;

    const data = {
        ...user,
        email: user.email.toLowerCase()
    };

    const params = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    };

    return fetch(url, params).then(resp => {
        if(resp.status >= 200 && resp.status < 300){
            return resp.json();
        }
        return {mensaje: "Usuario o contraseña incorrectos."}
    })
    .then(res => {
        return res;
    })
    .catch(err => {
        return err;
    });
}

export function setTokenApi(token){
    localStorage.setItem(TOKEN, token);
}

export function getTokenApi(){
    return localStorage.getItem(TOKEN);
}

export function logoutApi(){
    localStorage.removeItem(TOKEN);
}

export function isUserLogedApi() {
    const token = getTokenApi();

    if(!token){
        logoutApi();
        return null;
    }

    if(isExpiredToken(token)){
        logoutApi();
    }
    return jwtDecode(token);
}

function isExpiredToken(token){
    const { exp } = jwtDecode(token);
    const expire = exp * 1000;
    const timeOut = expire - Date.now();
    if(timeOut <= 0){
        return true;
    }
    return false;
}