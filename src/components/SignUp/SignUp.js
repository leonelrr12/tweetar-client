import React, { useState } from 'react';
import { Row, Col, Form, Button, Spinner } from "react-bootstrap";
import { values, size } from "lodash";
import { toast } from "react-toastify";
import { isEmailValid } from "../../utils/validations";
import { signUpApi } from "../../api/auth";

import "./SignUp.scss";

export default function SignUp(props) {

    const { setShowModal } = props;
    const [formData, setFormData] = useState(initialFormValue());
    const [loading, setLoading] = useState(false);

    const onSubmit = (e) => {
        e.preventDefault();

        let validCount = 0;
        values(formData).some(value => {
            value && validCount++;
            return null;
        });

        if(validCount !== size(formData)) {
            toast.warning("Completa todos los campos del formulario.");
        } else {
            if(!isEmailValid(formData.email)){
                toast.warning("Email inválido.");
            } else if(formData.password !== formData.repeatPassword) {
                toast.warning("Las contraseñas deben se iguales.");
            }else if(size(formData.password) < 6) {
                toast.warning("Largo mínimo de la contraseña es de 6 caracteres.");
            } else {
                setLoading(true);
                signUpApi(formData).then(resp => {
                    if(resp.code){
                        toast.warning(resp.mensaje);
                    }else{
                        toast.success("El usuario fue creado.");
                        setShowModal(false);
                        setFormData(initialFormValue());
                    }
                })
                .catch(() => {
                    toast.error("Error en el servidor, intentelo mas tarde.");
                }) 
                .finally(() => {
                    setLoading(false);
                });
            }
        }
    };

    const onChange = e => {
        setFormData({ 
            ...formData, 
            [e.target.name]: e.target.value 
        });
    };

    return (
        <div className="signin-up-form">
            <h2>Crea tu cuenta</h2>
            <form onSubmit={onSubmit} onChange={onChange}>
                <Form.Group>
                    <Row>
                        <Col>
                            <Form.Control 
                                type="text" 
                                placeholder="Nombre" 
                                name="nombre"
                                defaultValue={formData.nombre}
                                />
                        </Col>
                        <Col>
                            <Form.Control 
                                type="text" 
                                placeholder="Apellidos" 
                                name="apellidos"
                                defaultValue={formData.apellidos}                           
                                />
                        </Col>
                    </Row>
                </Form.Group>
                <Form.Group>
                    <Form.Control 
                        type="email" 
                        placeholder="Correo electrónico" 
                        name="email"
                        defaultValue={formData.email}                      
                        />
                </Form.Group>
                <Form.Group>
                    <Row>
                        <Col>
                            <Form.Control 
                                type="password" 
                                placeholder="Contraseña" 
                                name="password"
                                defaultValue={formData.password}                            
                                />
                        </Col>
                        <Col>
                            <Form.Control 
                                type="password" 
                                placeholder="Confirmar" 
                                name="repeatPassword"
                                defaultValue={formData.repeatPassword}  
                                />
                        </Col>
                    </Row>
                </Form.Group>                
                <Button variant="primary" type="submit">
                    {loading ? <Spinner animation="border" /> : "Registrate"}
                </Button>
            </form>
        </div>
    )
}


function initialFormValue() {
    return {
        nombre: "",
        apellidos: "",
        email: "",
        password: "",
        repeatPassword: ""
    };
}