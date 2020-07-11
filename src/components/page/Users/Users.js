import React, { useState, useEffect } from 'react';
import { Spinner, ButtonGroup, Button } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import { isEmpty } from "lodash";
import { useDebouncedCallback } from "use-debounce";
import queryString from "query-string";
import BasicLayout from "../../../layout/BasicLayout";
import ListUsers from '../../ListUsers';
import { getFollowsApi } from '../../../api/follow';

import "./Users.scss";

function Users(props) { 

    const { setCheckLogin, location, history } = props;
    const params = userQuery(location);
    const [users, setUsers] = useState(null);
    const [typeUser, setTypeUser] = useState(params.type || "follow");
    const [btnLoading, setBtnLoading] = useState(false);

    const [onSearch] = useDebouncedCallback((value) => {
        setUsers(null);
        history.push({
            search: queryString.stringify({...params, search: value, page: 1})
        });
    }, 500);

    useEffect(() => {
        getFollowsApi(queryString.stringify(params))
            .then(response => {
                // eslint-disable-next-line
                if(params.page == 1) {
                    if(isEmpty(response)) {
                        setUsers([]);
                    } else {
                        setUsers(response);
                    }
                } else {
                    if(!response) {
                        setBtnLoading(0);
                        setUsers([]);
                    } else {
                        setUsers([...users, response]);
                        setBtnLoading(false);
                    }
                }
            })
            .catch(err => {
                setUsers([]);
            });
    // eslint-disable-next-line            
    }, [location]);

    const onChangeType = (type) => {
        setUsers(null);
        if(type === "new") {
            setTypeUser(type);
        } else {
            setTypeUser("follow");
        }
        history.push({
            search: queryString.stringify({type: type, page: 1, search: ""})
        });
    };

    const moreUsers = () => {
        setBtnLoading(true);
        const newPage = parseInt(params.page) + 1;
        history.push({
            search: queryString.stringify({ ...params, page: newPage })
        });
    };
    
    return (
        <BasicLayout 
            className="users" 
            title="Usuarios" 
            setCheckLogin={setCheckLogin}
        >
            <div className="users__title">
                <h2>Usuarios</h2>
                <input 
                    type="text"
                    placeholder="Busca un usuario ..."
                    onChange={(e) => onSearch(e.target.value)}
                />
            </div>

            <ButtonGroup className="users__options">
                <Button 
                    className={typeUser === "follow" && "active"}
                    onClick={() => onChangeType("follow")}
                >
                    Siguiendo
                </Button>
                <Button 
                    className={typeUser === "new" && "active"}
                    onClick={() => onChangeType("new")}
                >
                    Nuevos
                </Button>
            </ButtonGroup>

            {!users ? (
                <div className="users__loading">
                    <Spinner animation="border" variant="info" />
                    Buscando usuarios
                </div>
            ) : (
                <>
                <ListUsers users={users}/>
                <Button 
                    onClick={moreUsers} 
                    className="load-more"
                > 
                    {!btnLoading ? (
                        btnLoading !== 0 && "Cargar mas usuarios"
                    ) : (
                        <Spinner 
                            as="span"
                            animation="grow"
                            size="sm"
                            rate="status"
                            aria-hidden="true"
                        />
                    )}
                </Button>
                </>
            )}
        </BasicLayout>
    );
}

function userQuery(location) {
    const { page = 1, type = "follow", search = ""} = queryString.parse(location.search);

    return { page, type, search };
}

export default withRouter(Users);