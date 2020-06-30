import React from 'react';
import BasicLayout from "../../../layout/BasicLayout";

import "./Home.scss";

export default function Home(props) {

    const { setCheckLogin } = props;

    return (
        <BasicLayout className="home" setCheckLogin={setCheckLogin}>
            <h2>Desde HOME</h2>
        </BasicLayout>
    );
}
