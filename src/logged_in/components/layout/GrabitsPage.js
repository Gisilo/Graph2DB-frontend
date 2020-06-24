import React from 'react';
import {GrabitsPanel} from "./GrabitsPanel";
import NavBar from "../navbar/NavBar";

function GrabitPage(props) {
    return (
        <div>
            <NavBar/>
            <GrabitsPanel/>
        </div>
    );
}

export default GrabitPage;