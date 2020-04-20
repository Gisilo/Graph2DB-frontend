import React from 'react';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import axios from 'axios';

function mapStateToProps(state, ownProps) {
	return {
		nameProject: state.nameProject
	}
}

class ButtonRedux extends React.Component {

	saveWork = () => {
		//const newGraph = this.props.trigger();
		const query = `mutation CreateGrabitByName{
						createGrabit(
							input: {
								nameProject: "aa5"
								graph: $newGraph
						){grabit{
							nameProject
							graph
							}
						}
					}`;

		let responsePromise = axios.post('http://127.0.0.1:8000/graphql',
			JSON.stringify({
				query: query,
				variables: {
					newGraph: "this.props.trigger()"
				},
			}));

		let res = responsePromise.then(
			(response) => {
				return response.data
			},
			(error) => {
				console.log(error);
			}
		);
		console.log(this.props.trigger());
	};

	render() {
		return (
			<Button onClick={() => this.saveWork()} className="px-5" variant={this.props.variant}>
				{this.props.text}
			</Button>
		);
	}

}

export default connect(mapStateToProps, null)(ButtonRedux);
