import React from 'react';
import { useMutation } from 'react-apollo';
import { SAVE_QUERY } from '../../costants/queries'


function SaveButton(props){

	const [saveGrabitQuery] = useMutation(SAVE_QUERY);

	const saveGrabit = () => {

		let newGraph = JSON.stringify(props.trigger());

		saveGrabitQuery({
			variables: {
				nameGrabit: "qwerrr",
				nGraph: newGraph
			}
		}).then(
			(success) => console.log("suc", success),
			(error) => console.log("err", error))
	};

	return (
		<button onClick={saveGrabit}>
			{props.text}
		</button>

	);
}

export default SaveButton;
