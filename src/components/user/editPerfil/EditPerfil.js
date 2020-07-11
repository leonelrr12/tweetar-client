import React, { useState, useCallback } from "react";
import { Form, Button, Row, Col, Spinner } from "react-bootstrap";
import DatePicker from "react-datepicker";
import es from "date-fns/locale/es";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";
import { API_HOST } from "../../../utils/constants";
import { Camara } from "../../../utils/icons";
import { uploadBannerApi, uploadAvatarApi, updateInfoApi } from "../../../api/user";

import "./EditPerfil.scss";

export default function EditPerfil(props) {

    const { user, setShowModal } = props;
    const [formData, setFormData] = useState(initialValue(user));

    const [bannerUrl, setBannerUrl] = 
        useState(user?.Banner ? `${API_HOST}/obtenerbanner?id=${user.id}` : null);
    const [bannerFile, setBannerFile] = useState(null);

    const [avatarUrl, setAvatarUrl] = 
    useState(user?.Avatar ? `${API_HOST}/obteneravatar?id=${user.id}` : null);
    const [avatarFile, setAvatarFile] = useState(null);
    const [loading, setLoading] = useState(null)

    // eslint-disable-next-line
    const onDropBanner = useCallback(acceptedFile => {
        const file = acceptedFile[0];
        setBannerUrl(URL.createObjectURL(file));
        setBannerFile(file);
    });
    const { getRootProps: getBannerRootProps, getInputProps: getBannerInputProps } = useDropzone({
        accept: "image/jpeg, image/png",
        noKeyboard: true,
        multiple: false,
        onDrop: onDropBanner
    });

    // eslint-disable-next-line
    const onDropAvatar = useCallback(acceptedFile => {
        const file = acceptedFile[0];
        setAvatarUrl(URL.createObjectURL(file));
        setAvatarFile(file);
    });    
    const { getRootProps: getAvatarRootProps, getInputProps: getAvatarInputProps } = useDropzone({
        accept: "image/jpeg, image/png",
        noKeyboard: true,
        multiple: false,
        onDrop: onDropAvatar
    });

    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if(bannerFile) {
            await uploadBannerApi(bannerFile).catch(() => {
                toast.warning("Error al subir el nuevo Banner.")
            });
        }
        if(avatarFile) {
            await uploadAvatarApi(avatarFile).catch(() => {
                toast.warning("Error al subir el nuevo Avatar.")
            });
        }        

        await updateInfoApi(formData).then(() => {
            setShowModal(false);
        })
        .catch(() => {
            toast.warning("Error al actualizar los datos.");
        });
            
        setLoading(false);
        window.location.reload();
    };

    const onChange = (e) => {
        setFormData( {...formData, 
            [e.target.name] : e.target.value
        });
    }

    return (
        <div className="edit-user-form">
            <div 
                className="banner" 
                style={{ backgroundImage: `url('${bannerUrl}')`}}
                {...getBannerRootProps()}
                >
                <input {...getBannerInputProps()}/>
                <Camara />
            </div>
            <div 
                className="avatar" 
                style={{ backgroundImage: `url('${avatarUrl}')`}}
                {...getAvatarRootProps()}
                >
                <input {...getAvatarInputProps()}/>
                <Camara />
            </div>
            <Form onSubmit={onSubmit}>
                <Form.Group>
                    <Row>
                        <Col>
                            <Form.Control 
                                type="text" 
                                placeholder="Nombre" 
                                name="Nombre" 
                                defaultValue={formData.Nombre}
                                onChange={onChange}
                                />
                        </Col>
                        <Col>
                            <Form.Control 
                                type="text" 
                                placeholder="Apellidos" 
                                name="Apellidos" 
                                defaultValue={formData.Apellidos}
                                onChange={onChange}
                                />
                        </Col>
                    </Row>
                </Form.Group>
                <Form.Group>
                    <Form.Control
                        as="textarea"
                        row="3"
                        placeholder="Agrega tu biografía"
                        type="text"
                        name="Biografia"
                        defaultValue={formData.Biografia}
                        onChange={onChange}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Control 
                        type="text" placeholder="Sitio Web" name="SitioWeb"
                        defaultValue={formData.SitioWeb}
                        onChange={onChange}
                    />
                </Form.Group>

                <Form.Group>
                    <DatePicker 
                        placeholder="Fecha de nacimiento"
                        locale={es}
                        selected={new Date(formData.FecNac)}
                        onChange={value => setFormData({...formData, FecNac: value})}
                    />
                </Form.Group>
                <Button className="btn-submit" varaint="primary" type="submit">
                    {loading && <Spinner animation="border" size="sm" />} Actualizar
                </Button>
            </Form>
        </div>
    )
}


function initialValue(user) {
    return {
        Nombre: user.Nombre || "",
        Apellidos: user.Apellidos || "",
        Biografia: user.Biografia || "",
        Ubicacion: user.Ubicacion || "",
        SitioWeb: user.SitioWeb || "",
        FecNac: user.FecNac || ""
    };
}