import React, { Component } from 'react'
import CytoscapeComponent from 'react-cytoscapejs'
import { NodeModal } from './NodeModal'
import { CreateNodeModal } from './CreateNodeModal'

import cytoscape from 'cytoscape';
import edgehandles from 'cytoscape-edgehandles';
import dblclick from 'cytoscape-dblclick';

cytoscape.use(dblclick);
cytoscape.use(edgehandles);


export class GraphEditor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modalNodeInfoShow: false, nodeInfo: null,
            modalNodeCreateShow: false};
    }


    componentDidMount = () => {
        this.cy.dblclick(); // For double click
        let eh = this.cy.edgehandles();
        eh.enableDrawMode();
        //eh.disableDrawMode();
        //let la = this.cy.layout( this.options );
        //la.run();

        // Double click event on canvas -> create new node
        this.cy.on('dblclick', (event, renderedPosition) => {
            let newId = this.getNewID();
            this.setState({modalNodeCreateShow: true, nodeInfoCreate: null,
                newNodeId: newId, posX:renderedPosition.position.x, posY: renderedPosition.position.y});
        });

        // click on node
        this.cy.on('click', 'node', (event) => {
            let clickedNode = this.cy.getElementById(event.target.id());
            //clickedNode.data().property.push({ww: 234});
            console.log(clickedNode.data().label);
            this.setState({modalShow: true, nodeInfo:clickedNode});

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
        console.log("newGraph in editor", newGraph);
        this.cy.json({ elements: newGraph });
    };

    logKey = (e) => {
        console.log(e);
    };

    // Create new node
    newNode = (newNodeName, newNodeDesciption) => {
        this.cy.add({
            data: {
                id: this.state.newNodeId,
                label: newNodeName,
                description: newNodeDesciption,
                property:[] },
            position: { x: this.state.posX, y: this.state.posY }
        }
        ).css({ 'background-color': 'blue' });
        console.log("nene", this.cy.nodes().data('label'));
    };

    // Get new node ID
    getNewID = () => this.cy.nodes().size() + 1;

    // Get JSON of graph
    getJSON = () =>{
        // get all: graph + style + more => this.cy.json()
        // get only nodes and edges
        return this.cy.elements().jsons()
    };


    render() {
        return (
            <div>
                <CytoscapeComponent
                    elements={[]}
                    stylesheet={graphStyle.style}
                    style={{ width: window.width, height: window.innerHeight}}
                    onKeyDown={this.logKey}
                    tabIndex="0"
                    cy={(cy) => {
                        this.cy = cy;
                    }}

                />

                <NodeModal nodeInfo={this.state.nodeInfo}
                           show={this.state.modalShow}
                           onHide={() => this.setState({modalShow: false})}/>

                <CreateNodeModal callBack={this.newNode}
                           show={this.state.modalNodeCreateShow}
                           onHide={() => this.setState({modalNodeCreateShow: false})}/>
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
