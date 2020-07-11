import React, { useState } from 'react';
import { Modal, Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { Close } from "../../../utils/icons";
import { addTweetApi } from "../../../api/tweet";

import "./TweetModal.scss";

export default function TweetModal(props) {

    const { show, setShow } = props;
    const [message, setMessage] = useState("");
    const maxLeng = 280;

    const onSubmit = (e) => {
        e.preventDefault();
        
        if(message.length > 0 && message.length <= maxLeng) {
            addTweetApi(message)
                .then((response) => {
                    if(response?.code >= 200 && response?.code < 300){
                        toast.success(response.message);
                        setShow(false);
                        window.location.reload();
                    }
                })
                .catch(() => {
                    toast.warning("Error al enviar el Tweet al servidor.");
                });
        }
    };

    const idCount = document.getElementById("count");

    const onChange = (e) => {
        let wkMessage = e.target.value;
        setMessage(wkMessage);
        if(idCount) {
            if(wkMessage.length > maxLeng) {
                idCount.setAttribute("class", "count error");
            } else {
                idCount.setAttribute("class", "count");
            }
        }
    };

    return (
        <Modal
            className="tweet-modal"
            show={show}
            onHide={() => setShow(false)}
            centered
            size="lg"
        >
            <Modal.Header>
                <Modal.Title>
                    <Close onClick={() => setShow(false)}/>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={onSubmit}>
                    <Form.Control 
                        as="textarea"
                        rows="6"
                        placeholder="¿Que estas pensando?"
                        onChange={onChange}
                    />
                     <span id="count" className="count"
                    >
                        {message.length}
                    </span>
                    <Button 
                        type="submit"
                        disabled={message.length < 1 || message.length > maxLeng}
                    >Tweetar</Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
}
