import React from 'react';
import { Button } from 'react-bootstrap';

import gql from 'graphql-tag'
import { withApollo } from 'react-apollo';
import { Mutation } from "react-apollo";

const query = gql`mutation CreateGrabitByName{
					createGrabit(
					input: {
					  nameProject: "prova_graph_88"
					  graph: "$newGraph"
					  
					}
					 ){grabit{
					nameProject
					graph
					  }
				  }
				  
					}`;



class SaveButton extends React.Component {

	saveWork = () => {
		let promise = this.props.client.query({
			query: query,
		});
		promise.then(
			(success) => console.log("suc", success),
			(error) => console.log("err", error))
	};



	render() {
		return (
			<Mutation mutation={query}>
				{(mutate, {data}) =>
					<Button onClick={() => {mutate({ variables: { newGraph: this.props.trigger() } });
					console.log("data", data)}} className="px-5" variant={this.props.variant}>
						{this.props.text}
					</Button>
				}
			</Mutation>

		);
	}

}

export default withApollo(SaveButton);
