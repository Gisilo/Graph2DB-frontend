import React, { Component } from 'react'
import CytoscapeComponent from 'react-cytoscapejs'

import cytoscape from 'cytoscape';
import edgehandles from 'cytoscape-edgehandles';
import dblclick from 'cytoscape-dblclick';

cytoscape.use(dblclick);
cytoscape.use(edgehandles);


export class GraphEditor extends Component {

    state = {
        w: 0,
        h: 0,

    };

    componentDidMount = () => {
        this.cy.dblclick(); // For double click
        //let nid = 3;
        this.setState({
            w: window.width,
            h: window.innerHeight,
            //layout: {name: 'cose'},
        });
        let eh = this.cy.edgehandles();
        eh.disableDrawMode();
        //let la = this.cy.layout( this.options );
        //la.run();

        // Double click event on canvas -> create new node
        this.cy.on('dblclick', (event, renderedPosition) => {
            let new_id = this.get_max_node_id() + 1;
            this.new_node(new_id, renderedPosition.position.x, renderedPosition.position.y);
        });

        // click on node
        this.cy.bind('click', 'node', (event) => {
            console.log(this.get_JSON());
            console.log("click on node");
            //this.cy.layout(this.state.layout).run();
            //this.cy.fit();
        });

        // click on edge
        this.cy.bind('click', 'edge', (event) => {
            console.log("click on edge");
        });

        this.cy.on('keydown', (e) => {
            console.log(e);
        });
    };

    loadGraph = (newGraph) => {
        this.setState({
            elements: newGraph,
        })
    };

    logKey = (e) => {
        console.log(e);
    };

    // Create new node
    new_node = (id, pos_x, pos_y) => {
        this.cy.add({
            data: { id: id, label: 'Node ' + id },
            position: { x: pos_x, y: pos_y }
        }
        ).css({ 'background-color': 'blue' });
    };

    // Get max value of id for create new node
    get_max_node_id = () => {
        let id_list = [];
        this.cy.nodes().forEach((node) => {
            id_list.push(parseInt(node.data('id')));
        });
        return Math.max.apply(Math, id_list)
    };

    // Get JSON of graph
    get_JSON = () =>{
        // get all: graph + style + more => this.cy.json()
        // get only nodes and edges
        return this.cy.elements().jsons()
    };




    render() {
        return (
            <div>
                <CytoscapeComponent
                    elements={this.state.elements}
                    stylesheet={graphStyle.style}
                    style={{ width: this.state.w, height: this.state.h }}
                    onKeyUp={(e) => {
                        console.log("ssssssssss");
                        this.logKey(e)
                    }}
                    tabIndex="0"
                    cy={(cy) => {
                        this.cy = cy;
                    }}

                />
            </div>
        )
    }
}

const graphStyle = {
    style: [
        {
            selector: 'edge',
            style: {
                'curve-style': 'bezier',
                'target-arrow-shape': 'triangle'
            }
        },

        // some style for the extension

        {
            selector: '.eh-handle',
            style: {
                'background-color': 'red',
                'width': 12,
                'height': 12,
                'shape': 'ellipse',
                'label': '+',
                'overlay-opacity': 0,
                'border-width': 12, // makes the handle easier to hit
                'border-opacity': 0
            }
        },

        {
            selector: '.eh-hover',
            style: {
                'background-color': 'red'
            }
        },

        {
            selector: '.eh-source',
            style: {
                'border-width': 2,
                'border-color': 'red'
            }
        },

        {
            selector: '.eh-target',
            style: {
                'border-width': 2,
                'border-color': 'red'
            }
        },

        {
            selector: '.eh-preview, .eh-ghost-edge',
            style: {
                'background-color': 'red',
                'line-color': 'red',
                'target-arrow-color': 'red',
                'source-arrow-color': 'red'
            }
        },

        {
            selector: '.eh-ghost-edge.eh-preview-active',
            style: {
                'opacity': 0
            }
        }
    ]
}
