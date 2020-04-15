import React, { Component } from 'react'
import CytoscapeComponent from 'react-cytoscapejs'

export class GraphEditor extends Component {


    state = {
        w: 0,
        h: 0,
        elements: [
            { data: { id: 'one', label: 'Node 1wwww' }, position: { x: 200, y: 200 } },
            { data: { id: 'two', label: 'Node 2' }, position: { x: 100, y: 0 }},
            { data: { source: 'one', target: 'two', label: 'Edge from Node1 to Node2'}}
        ]
    };

    componentDidMount = () => {
        let nid = 0;
        this.setState({
            w: window.width,
            h: window.innerHeight
        });
        console.log("DFF");
        this.cy.on('click', (event) => {
            console.log("dddddddddddddddd");
            nid = nid +1;
            this.new_node(nid)
        });

    };

    new_node = (id) => {
        this.cy.on('click', (event) => {
            console.log("dddddddddddddddd");
            this.cy.add({
                data: { id: id, label: 'Node swdwweew' }, position: { x: 400, y: 400 } }
            );
        });
    };

    setUpListeners = () => {
        console.log("DFF");
        this.cy.on('click', 'node', (event) => {
            console.log("dddddddddddddddd")
        })
    }

    render() {
        return (
            <div>
                <CytoscapeComponent
                    elements={this.state.elements}
                    style={{width: this.state.w, height: this.state.h}}
                    cy={(cy) => {
                        this.cy = cy
                    }}

                />
            </div>
        )
    }
}
