import React, { useState } from 'react';
import { Container, Row, Col, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faUser, faComment } from "@fortawesome/free-solid-svg-icons";
import BasicModal from "../../modal/basicModal/BasicModal";
import SignUp from "../../../components/SignUp/SignUp";
import SignIn from "../../../components/SignIn/SignIn";

import LogoWhite from "../../../assets/png/logo-white.png";
import LogoBlue from "../../../assets/png/logo.png";

import "./SignInSignUp.scss";

export default function SignInSignUp(props) {

    const [showModal, setShowModal] = useState(false);
    const [contentModal, setContentModal] = useState(null);
    const { setCheckLogin } = props;

    const openModal = (content) => {
        setShowModal(true);
        setContentModal(content);
    };

    return (
        <>
            <Container className="signin-signup" fluid>
                <Row>
                    <LeftComponent />
                    <RightComponent 
                        openModal={openModal}
                        setShowModal={setShowModal}
                        setCheckLogin={setCheckLogin}
                    />
                </Row>
            </Container>
            <BasicModal 
                show={showModal}
                setShow={setShowModal}
            >
                {contentModal}
            </BasicModal>
        </>
    );
}

function LeftComponent() {
    return (
        <Col className="signin-signup__left" xs={6}>
            <img src={LogoBlue} alt="Tweetar" />
            <div>
                <h2>
                    <FontAwesomeIcon icon={faSearch} />
                     Sigue lo que te interesa.
                </h2>
                <h2>
                    <FontAwesomeIcon icon={faUser} />
                     Enterate de que esta hablando la gente.
                </h2>
                <h2>
                    <FontAwesomeIcon icon={faComment} />
                     Únete a la conversacion.
                </h2>
            </div>
        </Col>
    );
}

function RightComponent(props) {

    const {openModal, setShowModal, setCheckLogin} = props;

    return (
        <Col className="signin-signup__right" xs={6}>
            <div>
                <img src={LogoWhite} alt="Tweetar" />
                <h2>Mira lo que está pasando en el mundo en este momento</h2>
                <h3>Únite a Tweetar hoy mismo.</h3>
                <Button 
                    variant="primary"
                    onClick={() => openModal(<SignUp setShowModal={setShowModal}/>)}
                    >Regístrate</Button>
                <Button 
                    variant="outline-primary"
                    onClick={() => openModal(<SignIn setShowModal={setShowModal} setCheckLogin={setCheckLogin}/>)}
                    >Iniciar sesión</Button>
            </div>
        </Col>
    );
}