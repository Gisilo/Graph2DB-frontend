import React, { Component } from 'react'
import CytoscapeComponent from 'react-cytoscapejs'
import { NodeModal } from './NodeModal'
import { EdgeModal } from './EdgeModal'

import cytoscape from 'cytoscape';
import edgehandles from 'cytoscape-edgehandles';
import dblclick from 'cytoscape-dblclick';

cytoscape.use(dblclick);
cytoscape.use(edgehandles);


export class GraphEditor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            nodeModalShow: false,           // Show node modal
            edgeModalShow: false,           // Show edge modal
            typeModal: "",                  // type of modal, can be edit or create (TODO use enum)
            nodeInfo: null,                 // info of selected node
            edgeInfo: null,                 // info of selected edge
            nameList:null,                  // list of all nodes or edges names
            eh: null                        // edge handle object
        };
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

        this.cy.on('ehcomplete', (event, sourceNode, targetNode, addedEles) => {

            let nameList = this.cy.elements().map(x => x.data().label);
            const nEdges = sourceNode.edgesTo(targetNode).length;

            let clickedEdge = addedEles[0].data();
            clickedEdge.label = nEdges === 1 ?             // Else create unique new name as source_target_nEdges
                `${sourceNode.data().label}_${targetNode.data().label}` :
                `${sourceNode.data().label}_${targetNode.data().label}_${nEdges}`;
            clickedEdge.description = "";
            clickedEdge.cardinality = {max:"", min:""};
            clickedEdge.properties = [];
            clickedEdge.sourceLabel = sourceNode.data().label;
            clickedEdge.targetLabel = targetNode.data().label;

            this.setState({edgeModalShow: true, edgeInfo:clickedEdge, typeModal:"create", nameList:nameList});
        });

        // Double click event on canvas -> create new node
        this.cy.on('dblclick', (event, renderedPosition) => {
            let nameList = this.cy.elements().map(x => x.data().label);
            if (event.target === this.cy){
                this.setState({nodeModalShow: true, typeModal:"create", nameList:nameList,
                    posX:renderedPosition.position.x, posY: renderedPosition.position.y, nodeInfo:null});
            }
            else if (event.target.isNode()){
                let clickedNode = event.target.data();
                this.setState({nodeModalShow:true, typeModal:"edit", nodeInfo:clickedNode, nameList:nameList});
            }
            else if (event.target.isEdge()){
                let clickedEdge = event.target.data();
                console.log(clickedEdge);
                this.setState({edgeModalShow:true, typeModal:"create", edgeInfo:clickedEdge, nameList:nameList,});
            }
        });

        this.cy.on('keydown', (e) => {
            console.log(e);
        });
    };

    loadGraph = (newGraph) => {
        this.cy.json({ elements: newGraph });
        this.setState({nodesNameList: this.cy.elements().map(x => x.data().label)});
    };

    logKey = (e) => {
        console.log(e);
    };

    editEdge = (data) => {
        this.setState({edgeInfo: this.updateEdgeInfo(this.state.edgeInfo, data)});
    };

    updateEdgeInfo = (edgeInfo, data) => {
        console.log("data", data);
        edgeInfo.label = data.nName;
        edgeInfo.description = data.nDesc;
        edgeInfo.properties =  data.nProps;
        edgeInfo.cardinality = {max:data.cardMax, min:data.cardMin};
        return edgeInfo;
    };

    updateNodeInfo = (nodeInfo, data) => {
        console.log("data", data);
        nodeInfo.label = data.nName;
        nodeInfo.description = data.nDesc;
        nodeInfo.properties =  data.nProps;
    };

    editNode = (data) =>{
        if(this.state.nodeInfo){
            this.setState({nodeInfo: this.updateNodeInfo(this.state.nodeInfo, data)});
        }
        else{
            this.cy.add({
                data: {
                    id: this.getNewID(),
                    label: data.nName,
                    description: data.nDesc,
                    properties: data.nProps },
                    position: { x: this.state.posX, y: this.state.posY }
                }
            ).css({ 'background-color': 'blue' });
        }

    };

    // Get new node ID
    getNewID = () => this.cy.nodes().size() + 1;

    // Get JSON of graph
    getJSON = () =>{
        // get all: graph + style + more => this.cy.json()
        // get only nodes and edges
        this.state.eh.removeHandle();
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
                    }}

                />

                <NodeModal nameList={this.state.nameList} callBack={this.editNode}
                           nodeInfo={this.state.nodeInfo} typeModal={this.state.typeModal}
                           open={this.state.nodeModalShow}
                           onClose={() => this.setState({nodeModalShow: false})}/>

                <EdgeModal nameList={this.state.nameList} callBack={this.editEdge}
                           edgeInfo={this.state.edgeInfo} typeModal={this.state.typeModal}
                           open={this.state.edgeModalShow}
                           onClose={() => this.setState({edgeModalShow: false})}/>

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
};
