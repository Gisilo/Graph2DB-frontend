import React from 'react';
import gql from 'graphql-tag'
import { Button } from 'react-bootstrap';
import { useMutation } from 'react-apollo';

const SAVE_QUERY = gql`
	mutation CreateGrabitByName($nameGrabit: String!, $nGraph: String!) {
	  createGrabit(input: {nameProject: $nameGrabit, graph: $nGraph}) {
		msg
		grabit {
		  nameProject
		}
	  }
	}`;

function SaveButton(props){

	const [saveGrabitQuery] = useMutation(SAVE_QUERY);

	const saveGrabit = () => {

		let newGraph = JSON.stringify(this.props.trigger());

		saveGrabitQuery({
			variables: {
				nameProject: "prova8",
				nGraph: newGraph
			}
		}).then(
			(success) => console.log("suc", success),
			(error) => console.log("err", error))
	};

	return (
		<Button onClick={saveGrabit} className="px-5" variant={props.variant}>
			{props.text}
		</Button>

	);
}

export default SaveButton;
