import React from 'react';
import { Button } from 'react-bootstrap';

import gql from 'graphql-tag'
import { withApollo } from 'react-apollo';
import { Mutation } from "react-apollo";

const mutate = gql`mutation CreateGrabitByName{
					createGrabit(
					input: {
					  nameProject: "prova_graph_3212"
					  graph: $newGraph
					  
					}
					 ){grabit{
					nameProject
					graph
					  }
				  }
				  
					}`;

const query = gql`query GrabitIDAndName{
				allGrabits(nameProject: $name){
					edges{
						node{
							id,
								nameProject
							graph
						}
					}
			
				}
			}`;

class SaveButton extends React.Component {

	saveWork = () => {
		const newGraph = JSON.stringify(this.props.trigger());
		console.log(newGraph);
		const mutation = gql`mutation CreateGrabitByName{
					createGrabit(
					input: {
					  nameProject: "prova_graph_88888"
					  graph: "${newGraph}"
					  
					}
					 ){grabit{
					nameProject
					graph
					  }
				  }
				  
					}`;
		let promise = this.props.client.mutate({
			//query: query,
			mutation: mutation,

		});
		promise.then(
			(success) => console.log("suc", success),
			(error) => console.log("err", error))
	};



	render() {
		return (
			<Button onClick={this.saveWork} className="px-5" variant={this.props.variant}>
				{this.props.text}
			</Button>

		);
	}

}

export default withApollo(SaveButton);
