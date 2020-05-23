import React from 'react';
import { Button } from 'react-bootstrap';

import gql from 'graphql-tag'
import { withApollo } from 'react-apollo';

const LOAD_QUERY = gql`
    query GetGrabitByName($projectName: String!) {
      allGrabits(nameProject: $projectName) {
        edges {
          node {
            id
            nameProject
            nameDb
            dbms
            description
            port
            createdDate
            updateDate
            graph
          }
        }
      }
    }`;


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
            <Button onClick={this.loadProject} className="px-5" variant={this.props.variant}>
                {this.props.text}
            </Button>

        );
    }

}

export default withApollo(LoadButton);
