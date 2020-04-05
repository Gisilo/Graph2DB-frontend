import React, { Component } from 'react'
import CytoscapeComponent from 'react-cytoscapejs'

export class GraphEditor extends Component {


    state = {
        w: 0,
        h: 0,
        elements: [
            { data: { id: 'one', label: 'Node 1wwww' }, position: { x: 200, y: 200 } },
            { data: { id: 'two', label: 'Node 2' }, position: { x: 100, y: 100 }},
            { data: { source: 'one', target: 'two', label: 'Edge from Node1 to Node2'}}
        ],

    };

    options = {
        name: 'grid',

        };

    componentDidMount = () => {
        let nid = 0;
        this.setState({
            w: window.innerWidth,
            h: window.innerHeight,
            layout: {name: 'cose'}
        });
        //let la = this.cy.layout( this.options );
        //la.run();
        console.log("DFF");
        this.cy.on('click', (event) => {
            console.log("dddddddddddddddd");
            nid = nid +1;
            this.new_node(nid, event.position.x, event.position.y);
            this.cy.layout(this.state.layout).run();
            this.cy.fit();

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
                    style={{width: this.state.w, height: this.state.h}}
                    cy={(cy) => {
                        this.cy = cy;


                    }}

                />
            </div>
        )
    }
}
