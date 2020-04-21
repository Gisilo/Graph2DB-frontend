import React from 'react';
import { Button } from 'react-bootstrap';



export class ButtonRedux extends React.Component {

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
