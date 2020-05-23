import React from 'react';

import { LOAD_QUERY } from '../../costants/queries'

import { withApollo } from 'react-apollo';

class LoadButton extends React.Component {

    loadProject = () => {
        this.props.client.query({
            query: LOAD_QUERY,
            variables: {
                projectName: "prova8"
            }
        }).then(
            (success) => {
                console.log("suc", success);
                let currentGrabit = success.data.allGrabits.edges[0].node;
                let graphLoaded = JSON.parse(currentGrabit.graph);
                this.props.loadGraph(graphLoaded);
            },
            (error) => console.log("err", error))
    };

    render() {
        return (
            <button onClick={this.loadProject} className="px-5" variant={this.props.variant}>
                {this.props.text}
            </button>

        );
    }

}

export default withApollo(LoadButton);
