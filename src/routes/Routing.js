import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { map } from "lodash";
import configRouting from "./configRouting";

export default function Routing(props) {

    const { setCheckLogin } = props;
    return (
        <Router>
            <Switch>
                {map(configRouting, (route, idx) => (
                    <Route key={idx} path={route.path} exact={route.exact}>
                        <route.page setCheckLogin={setCheckLogin}/>
                    </Route> 
                ))}
            </Switch>
        </Router>
    );
}
