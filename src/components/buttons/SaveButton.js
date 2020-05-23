import React from 'react';
import gql from 'graphql-tag'
import { Button } from 'react-bootstrap';
import { useMutation } from 'react-apollo';
import { SAVE_QUERY } from '../../costants/queries'


function SaveButton(props){

	const [saveGrabitQuery] = useMutation(SAVE_QUERY);

	const saveGrabit = () => {

		let newGraph = JSON.stringify(props.trigger());

		saveGrabitQuery({
			variables: {
				nameGrabit: "prova8",
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
