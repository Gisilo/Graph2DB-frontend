import React, { Component } from 'react'
import CytoscapeComponent from 'react-cytoscapejs'

import cytoscape from 'cytoscape';
import edgehandles from 'cytoscape-edgehandles';
import dblclick from 'cytoscape-dblclick';
import {event} from "cytoscape/src/is";

cytoscape.use( dblclick );
cytoscape.use( edgehandles );


export class GraphEditor extends Component {

    state = {
        w: 0,
        h: 0,
        elements: [
            { data: { id: 'one', label: 'Node 1wwww' }, position: { x: 200, y: 200 } },
            { data: { id: 'two', label: 'Node 2' }, position: { x: 100, y: 100 }},
            { data: { source: 'one', target: 'two', label: 'Edge from Node1 to Node2'}}
        ],
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
        ],
    };

    componentDidMount = () => {
        let nid = 0;
        this.setState({
            w: window.width,
            h: window.innerHeight,
            //layout: {name: 'cose'},
        });
        let eh = this.cy.edgehandles();
        eh.disableDrawMode();
        //let la = this.cy.layout( this.options );
        //la.run();
        console.log("DFF");

        this.cy.ready(function() {
            console.log("ready");
        });
        this.cy.dblclick();

        this.cy.on('dblclick', (event) => {
            console.log("doppio click", event);
            nid = nid +1;
            this.new_node(nid, event.position.x, event.position.y);

        });

        this.cy.bind('click', 'node', (event) => {
            console.log(event);
            nid = nid +1;
            this.new_node(nid, event.position.x, event.position.y);
            //this.cy.layout(this.state.layout).run();
            //this.cy.fit();

        });
    };

    new_node = (id, pos_x, pos_y) => {
        this.cy.add({
            data: { id: id, label: 'Node ' + id },
            position: { x: pos_x, y: pos_y } }
        ).css({'background-color' : 'blue'});
    };


    render() {
        return (
            <div>
                <CytoscapeComponent
                    elements={this.state.elements}
                    stylesheet={this.state.style}
                    style={{width: this.state.w, height: this.state.h}}
                    cy={(cy) => {
                        this.cy = cy;
                    }}

                />
            </div>
        )
    }
}
