import React from 'react';
import { Button } from 'react-bootstrap';

import gql from 'graphql-tag'
import { withApollo } from 'react-apollo';


class LoadButton extends React.Component {

    loadProject = () => {
        this.props.client.query({
            query: gql
                `query GetGrabitByName($projectName: String!){
                    allGrabits(nameProject: $projectName){
                        edges{
                            node{
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
				}`,
            variables: {
                projectName: "dddd"
            }
        }).then(
            (success) => {
                console.log("suc", success);
                const currentProject = success.data.allGrabits.edges[0].node;
                console.log(currentProject.graph);
                currentProject.graph = JSON.parse(currentProject.graph);
                this.props.trigger(currentProject.graph);

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
