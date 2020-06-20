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

        // Double click event on canvas -> create new node
        this.cy.on('dblclick', (event, renderedPosition) => {
            let nameList = this.cy.elements().map(x => x.data().label);
            if (event.target === this.cy){
                this.setState({nodeModalShow: true, typeModal:"create", nameList:nameList,
                    posX:renderedPosition.position.x, posY: renderedPosition.position.y, nodeInfo:null});
            }
            else if (event.target.isNode()){
                let clickedNode = event.target;
                this.setState({nodeModalShow:true, typeModal:"edit", nodeInfo:clickedNode, nameList:nameList});
            }
            else if (event.target.isEdge()){
                let clickedEdge = event.target;
                // Get number of directed edge from source to target
                const nEdges = clickedEdge.source().edgesTo(clickedEdge.target()).length;
                // Set edge name
                clickedEdge.data().label = clickedEdge.data().label ?
                    clickedEdge.data().label : // If present, keep it
                    nEdges === 1 ?             // Else create unique new name as source_target_nEdges
                        `${clickedEdge.source().data().label}_${clickedEdge.target().data().label}` :
                        `${clickedEdge.source().data().label}_${clickedEdge.target().data().label}_${nEdges}`;
                // Set property objects: if present keep it, else create empty list
                clickedEdge.data().property = clickedEdge.data().property ? clickedEdge.data().property : [];
                clickedEdge.data().cardinality = clickedEdge.data().cardinality ?
                    clickedEdge.data().cardinality :
                    {max:"", min:""};

                this.setState({edgeModalShow: true, edgeInfo:clickedEdge, nameList:nameList});
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

    editEdge = (data) => {
        console.log("callback", data);
        this.setState({edgeInfo: this.state.edgeInfo.data({
                label: data.nName,
                description: data.nDesc,
                property: data.nProps,
                cardinality: {max:data.cardMax, min:data.cardMin}
            })});
        console.log(this.cy.edges());
    };

    editNode = (data) =>{
        if(this.state.nodeInfo){
            this.setState({nodeInfo: this.state.nodeInfo.data({
                    label: data.nName,
                    description: data.nDesc,
                    property: data.nProps
                })});
        }
        else{
            this.cy.add({
                data: {
                    id: this.getNewID(),
                    label: data.nName,
                    description: data.nDesc,
                    property: data.nProps },
                    position: { x: this.state.posX, y: this.state.posY }
                }
            ).css({ 'background-color': 'blue' });
        }
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
                    }}

                />

                <NodeModal nameList={this.state.nameList} callBack={this.editNode}
                           nodeInfo={this.state.nodeInfo} typeModal={this.state.typeModal}
                           open={this.state.nodeModalShow}
                           onClose={() => this.setState({nodeModalShow: false})}/>

                <EdgeModal nameList={this.state.nameList} callBack={this.editEdge}
                           edgeInfo={this.state.edgeInfo}
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
