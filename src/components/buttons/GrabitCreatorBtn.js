import React from 'react';
import { Button } from 'react-bootstrap';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);


export default class GrabitCreatorBtn extends React.Component {

	// Dati necessari:
	// Name project
	// Name DB 
	// DBMS Type: MySQL, SQLite, Neo4j
	// description
	// port (?)

	handleClick = async () => {
		const {value: formValues} = await MySwal.fire({
			title: 'Create a new Grabit',
			html:
				'<input id="swal-input1" class="swal2-input">' +
				'<input id="swal-input2" class="swal2-input">',
			focusConfirm: false,
			showCancelButton: true,
			preConfirm: () => {
				return [
					document.getElementById('swal-input1').value,
					document.getElementById('swal-input2').value,
				]
			}
		});
		console.log(formValues);
	}

	render() {
		return (
			<div>

				<Button onClick={this.handleClick} variant="outline-success">Nuovo</Button>{' '}
			</div>
		);
	}

}


