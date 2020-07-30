import React, {Component} from 'react'
import CytoscapeComponent from 'react-cytoscapejs'
import { NodeModal } from './NodeModal'
import { EdgeModal } from './EdgeModal'

import Cytoscape from 'cytoscape';
import edgehandles from 'cytoscape-edgehandles';
import dblclick from 'cytoscape-dblclick';
import {SAVE_MUT} from "../../../common/costants/queries";
import {withApollo} from "@apollo/react-hoc";
import {authenticationService} from "../../../common/services/authenticationService";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import TimelineIcon from '@material-ui/icons/Timeline';
import Fab from "@material-ui/core/Fab";
import {withStyles} from "@material-ui/core";
import Tooltip from "@material-ui/core/Tooltip";

Cytoscape.use(dblclick);
Cytoscape.use(edgehandles);

const styles = () => ({
    addNodeFab: {
        top: 'auto',
        right: 30,
        bottom: 30,
        left: 'auto',
        position: 'fixed',
    },
    layoutFab: {
        top: 'auto',
        right: 85,
        bottom: 30,
        left: 'auto',
        position: 'fixed',
    },
});

class GraphEditor extends Component {

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
        window.addEventListener('resize', this.updateDimensions);
        this.setupComponent();
    };

    setupComponent = () => {

        this.cy.dblclick(); // For double click
        let defaults = {};
        let eh = this.cy.edgehandles(defaults);
        this.setState({eh:eh});
        //eh.enableDrawMode();
        eh.disableDrawMode();

        this.cy.on('ehcomplete', (event, sourceNode, targetNode, addedEles) => {

            let nameList = this.cy.elements().map(x => x.data().label);
            const nEdges = sourceNode.edgesTo(targetNode).length;

            let clickedEdge = addedEles[0].data();
            clickedEdge.label = nEdges === 1 ?             // Create unique new name as source_target_nEdges
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
                this.setState({edgeModalShow:true, typeModal:"edit", edgeInfo:clickedEdge, nameList:nameList,});
            }
        });

        this.cy.on('select', 'node', (e) => {
            console.log(e);
            const selectedNode = this.cy.$('node:selected').on('keyup', (ev) => {console.log(ev)});
            console.log(selectedNode);
        });

    };

    updateDimensions = () => {
        this.setState(this.state);
    };

    loadGraph = (newGraph) => {
        this.cy.json({ elements: newGraph });
        this.setState({nodesNameList: this.cy.elements().map(x => x.data().label)});
    };

    deleteNode = (id) => {
        const node = this.cy.getElementById(id);
        this.cy.remove(node);
        this.saveGraphToDB(this.props.idGrabit, authenticationService.currentUserValue.pk);

    };

    logKey = (e) => {
        console.log(e);
    };

    saveEdge = (data) => {
        this.setState({edgeInfo: this.updateEdgeInfo(this.state.edgeInfo, data)});
        this.saveGraphToDB(
            this.props.idGrabit,
            authenticationService.currentUserValue.pk);
    };

    updateEdgeInfo = (edgeInfo, data) => {
        edgeInfo.label = data.nName;
        edgeInfo.description = data.nDesc;
        edgeInfo.properties =  data.nProps;
        edgeInfo.cardinality = {max:data.cardMax, min:data.cardMin};
        return edgeInfo;
    };

    updateNodeInfo = (nodeInfo, data) => {
        nodeInfo.label = data.nName;
        nodeInfo.description = data.nDesc;
        nodeInfo.properties =  data.nProps;
        return nodeInfo;
    };

    saveNode = (data) =>{
        if(this.state.nodeInfo){
            this.setState({nodeInfo: this.updateNodeInfo(this.state.nodeInfo, data)});
        }
        else{
            const colorClass = this.getNodeColor();
            this.cy.add({
                classes: colorClass,
                data: {
                    id: this.getNewID(),
                    label: data.nName,
                    description: data.nDesc,
                    properties: data.nProps },
                    position: { x: this.state.posX, y: this.state.posY }
                }
            );//.css('background-color', color);

        }
        this.saveGraphToDB(this.props.idGrabit, authenticationService.currentUserValue.pk);

    };

    getNodeColor = () => {
        const palette = ['dartmouth-green', 'goldenrod', 'mint', 'red-salsa', 'cinereous'];
        return palette[Math.floor(Math.random() * (palette.length))];
    };

    // Get new node ID
    getNewID = () => this.cy.nodes().size() + 1;

    // Get JSON of graph
    getGraphJSON = () =>{
        // get all: graph + style + more => this.cy.json()
        // get only nodes and edges
        this.state.eh.removeHandle();
        return this.cy.elements().jsons()
    };

    saveGraphToDB = (grabitID, owner) => {
        this.props.client
            .mutate({
                mutation: SAVE_MUT,
                variables: {
                    id: grabitID,
                    graph: JSON.stringify(this.getGraphJSON()),
                    owner: owner
                },
            }).then(
            (response) => {
                console.log("success", response);
            },
            (error) => console.error("error", error)
        );
    };

    render() {
        
        return (
            <div>
                <CytoscapeComponent
                    wheelSensitivity={0.5}
                    boxSelectionEnabled={true}
                    minZoom={0.5}
                    maxZoom={2}
                    elements={this.props.graph}
                    stylesheet={graphStyle.style}
                    style={ { 
                        width: window.innerWidth,
                        height: window.innerHeight - this.props.heightOffset} }
                    onKeyDown={this.logKey}
                    tabindex="0"
                    cy={(cy) => {
                        this.cy = cy;
                    }}
                    layuot = {layout}
                />
                <Tooltip title={'Reorder Nodes'}>
                    <Fab
                        size="small"
                        color="primary"
                        aria-label="reorder nodes"
                        className={this.props.classes.layoutFab}
                        onClick={() => this.cy.layout( layout ).run()}
                    >
                        <TimelineIcon/>
                    </Fab>
                </Tooltip>

                <Tooltip title={'Add New Node'}>
                    <Fab
                        size="small"
                        color="primary"
                        aria-label="add node"
                        className={this.props.classes.addNodeFab}
                        onClick={() => this.setState({nodeModalShow: true, typeModal:"create",
                            nameList:this.cy.elements().map(x => x.data().label),
                            posX:50, posY: 50, nodeInfo:null})}
                    >
                        <AddCircleOutlineIcon/>
                    </Fab>
                </Tooltip>

                <NodeModal nameList={this.state.nameList} callBack={this.saveNode} deleteNode={this.deleteNode}
                           nodeInfo={this.state.nodeInfo} typeModal={this.state.typeModal}
                           open={this.state.nodeModalShow}
                           onClose={() => this.setState({nodeModalShow: false})}/>

                <EdgeModal nameList={this.state.nameList} callBack={this.saveEdge}
                           edgeInfo={this.state.edgeInfo} typeModal={this.state.typeModal}
                           open={this.state.edgeModalShow}
                           onClose={() => this.setState({edgeModalShow: false})}/>

            </div>
        )
    }
}
export default withStyles(styles, {withTheme: true})(withApollo(GraphEditor));

const layout = {
    name: 'cose',
    animate: false,};

const graphStyle = {
    style: [
        {
            selector: '.dartmouth-green',
            style: {
                'background-color': '#1b7b34'
            }
        },
        {
            selector: '.goldenrod',
            style: {
                'background-color': '#eab126'
            }
        },
        {
            selector: '.mint',
            style: {
                'background-color': '#1FB58F'
            }
        },
        {
            selector: '.red-salsa',
            style: {
                'background-color': '#f24c4e'
            }
        },
        {
            selector: '.cinereous',
            style: {
                'background-color': '#93827f'
            }
        },
        {
            selector: ':selected',
            css: {
                'background-color': 'black',
                'line-color': 'black',
                'target-arrow-color': 'black',
                'source-arrow-color': 'black'
            }
        },
        {
            selector: 'node',
            css: {
                'label': 'data(id)',
                //'background-color': 'green',
                'color': 'black',
                'border-width': '1px',
                'border-color': 'black'
            }
        },
        {
            selector: "edge[label]",
            css: {
                "label": "data(label)",
                "text-rotation": "autorotate",
                "text-margin-x": "10px",
                "text-margin-y": "10px"
            }
        },
        {
            selector: 'edge',
            css: {
                'line-color': 'grey',
                'curve-style': 'bezier',
                'target-arrow-shape': 'triangle',
                'target-arrow-color': 'grey',
                'arrow-scale': '1',
                //'label': 'data(label)',
                'overlay-opacity': 0,
                'edge-text-rotation': 'autorotate'
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
                'label': '',
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
