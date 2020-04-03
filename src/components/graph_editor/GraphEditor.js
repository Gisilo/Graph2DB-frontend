import React from 'react';
import './graph_editor.css'
import './graph_editor'

const gx = require("mxgraph");

export class GraphEditor extends React.Component {

    render() {
        console.log("sss");

        return (
                <div className="./graph_editor.css">
                    <script src="./graph_editor.js" />
                </div>
        );
    }
}
