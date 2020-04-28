import React from 'react';
import { Button } from 'react-bootstrap';

import gql from 'graphql-tag'
import { withApollo } from 'react-apollo';


class SaveButton extends React.Component {

	saveProject = () => {
		let newGraph = JSON.stringify(this.props.trigger());
		this.props.client.mutate({
			mutation: gql
				`mutation CreateGrabitByName($nGraph: String!){
						createGrabit(
								input: {
										nameProject: "prova8",
										graph: $nGraph
								}
						){
								msg
								grabit {
										nameProject
								}
						}
				}`,
			variables: {
				nGraph: newGraph
			}
		}).then(
			(success) => console.log("suc", success.data.createGrabit.msg),
			(error) => console.log("err", error))

	};

	render() {
		return (
			<Button onClick={this.saveProject} className="px-5" variant={this.props.variant}>
				{this.props.text}
			</Button>

		);
	}

}

export default withApollo(SaveButton);
