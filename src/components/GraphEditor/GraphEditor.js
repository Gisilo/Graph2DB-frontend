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
            modalNodeCreateShow: false, nodesNameList:null,
            eh: null};
    }


    componentDidMount = () => {
        this.cy.dblclick(); // For double click
        let defaults = {};
        let eh = this.cy.edgehandles(defaults);
        this.setState({eh:eh});
        //eh.enableDrawMode();
        eh.disableDrawMode();
        //let la = this.cy.layout( this.options );
        //la.run();

        // Double click event on canvas -> create new node
        this.cy.on('dblclick', (event, renderedPosition) => {
            let nodesNameList = this.cy.elements().map(x => x.data().label);
            if (event.target === this.cy){
                let newId = this.getNewID();
                this.setState({modalNodeCreateShow: true, nodeInfoCreate: null, nodesNameList:nodesNameList,
                    newNodeId: newId, posX:renderedPosition.position.x, posY: renderedPosition.position.y});
            }
            else if (event.target.isNode()){
                let clickedNode = event.target;
                this.setState({modalShow: true, nodeInfo:clickedNode, nodesNameList:nodesNameList});
            }
            else if (event.target.isEdge()){
                console.log("click on edge");
            }
        });

        this.cy.on('keydown', (e) => {
            console.log(e);
        });
    };

    loadGraph = (newGraph) => {
        console.log("newGraph in editor", newGraph);
        this.cy.json({ elements: newGraph });
        this.setState({nodesNameList: this.cy.elements().map(x => x.data().label)});
    };


    logKey = (e) => {
        console.log(e);
    };

    // Create new node
    newNode = (newNodeName, newNodeDesciption, newNodeProperty) => {
        console.log("pwpw", newNodeProperty);
        this.cy.add({
            data: {
                id: this.state.newNodeId,
                label: newNodeName,
                description: newNodeDesciption,
                property:newNodeProperty },
            position: { x: this.state.posX, y: this.state.posY }
        }
        ).css({ 'background-color': 'blue' });
        console.log("nene", this.cy.nodes().jsons());
    };

    editNode = (editNode) =>{
        //console.log("call edit", editNode);
        this.setState({nodeInfo: this.state.nodeInfo.data({
                label: editNode.nName,
                description: editNode.nDesc,
                property: editNode.nProps
            })});
        console.log("dopo set state", this.cy.nodes().jsons())

    };

    // Get new node ID
    getNewID = () => this.cy.nodes().size() + 1;

    // Get JSON of graph
    getJSON = () =>{
        // get all: graph + style + more => this.cy.json()
        // get only nodes and edges
        console.log("prime", this.cy.elements().jsons());
        this.state.eh.removeHandle();
        console.log("dopo", this.cy.elements().jsons());
        return this.cy.elements().jsons()
    };


    render() {
        
        return (
            <div>
                <CytoscapeComponent
                    wheelSensitivity={0.5}
                    boxSelectionEnabled={true}
                    minZoom={0.5}
                    maxZoom={2}
                    elements={[]}
                    stylesheet={graphStyle.style}
                    style={ { 
                        width: window.innerWidth, 
                        height: window.innerHeight - this.props.heightOffset} }
                    onKeyDown={this.logKey}
                    tabIndex="0"
                    cy={(cy) => {
                        this.cy = cy;
                        console.log(cy.width());
                        console.log(cy.height());
                    }}

                />

                <NodeModal nodesNameList={this.state.nodesNameList} callBack={this.editNode}
                           nodeInfo={this.state.nodeInfo}
                           show={this.state.modalShow}
                           onHide={() => this.setState({modalShow: false})}/>

                <CreateNodeModal nodesNameList={this.state.nodesNameList} callBack={this.newNode}
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
                'width': 10,
                'height': 10,
                'shape': 'ellipse',
                'label': 'gb',
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
