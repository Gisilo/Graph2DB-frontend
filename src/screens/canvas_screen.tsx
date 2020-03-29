import React from 'react';
import '../components/graph_editor/graph_editor.css';
import '../components/graph_editor/graph_editor';

export class CanvasScreen extends React.Component {

    render(){
        return <div className='graph_editor.css'>
            <script src="../components/graph_editor/graph_editor.js"/>
        </div>
    }

}


