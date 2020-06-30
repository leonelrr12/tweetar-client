import React, {useState} from 'react';
import { Form, Button, Spinner } from "react-bootstrap";
import { values, size } from "lodash";
import { toast } from "react-toastify";
import { isEmailValid } from "../../utils/validations";
import { signInApi, setTokenApi } from "../../api/auth";

import "./SignIn.scss";

export default function SignIn(props) {

    const [formData, setFormData] = useState(initialValue());
    const [loading, setLoading] = useState(false);
    const {setCheckLogin} = props;

    const onSubmit = e => {
        e.preventDefault();
        
        let validCount = 0;
        values(formData).some(value => {
            value && validCount++;
            return null;
        });

        if(validCount !== size(formData)){
            toast.warning("Debe indicar todos los campos del formulario.");
        }else{
            if(!isEmailValid(formData.email)) {
                toast.warning("El email es inválido.");
            }else{
                setLoading(true);
                signInApi(formData)
                .then(resp => {
                    if(resp.mensaje) {
                        toast.warning("resp.mensaje");
                    }else{
                        setTokenApi(resp.Token);
                        setCheckLogin(true);
                    }
                })
                .catch(() => {
                    toast.warning("Error del servidor, intentelo mas tarde.");
                })
                .finally(() => {
                    setLoading(false);
                });
            }
        }
    };

    const onChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name] : e.target.value
        });
    };

    return (
        <div className="sign-in">
            <h2>Entrar</h2>
            <Form onSubmit={onSubmit} onChange={onChange}>
                <Form.Group>
                    <Form.Control 
                        type="email" 
                        name="email"
                        placeholder="Correo electrónico" 
                        defaultValue={formData.email}
                        />
                </Form.Group>
                <Form.Group>
                    <Form.Control 
                        type="password" 
                        name="password"
                        placeholder="Contraseña" 
                        defaultValue={formData.password}
                        />
                </Form.Group>
                <Button variant="primary" type="submit">
                    {loading ? <Spinner animation="border" /> : "Iniciar Sesión"}
                </Button>
            </Form>
        </div>
    );
}


function initialValue() {
    return {
        email: "",
        password: ""
    }
}