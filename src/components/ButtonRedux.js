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
		let responsePromise = axios.post('127.0.0.1:8000/graphql', {
			query: {
				allGrabits: {
					edges: {
						node:
							[
								"id",
								"nameProject",
								"nameDb"
							]
					}
				}
			}
		});
		responsePromise.then(
			(response) => { console.log(response); },
			(error) => { console.log(error); }
		);
	}

	render() {
		return (
			<Button onClick={() => this.saveWork()} className="px-5" variant={this.props.variant}>
				{this.props.text}
			</Button>
		);
	}

}

export default connect(mapStateToProps, null)(ButtonRedux);
