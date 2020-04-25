import React from 'react';
import { Button, Modal, InputGroup, FormControl } from 'react-bootstrap';

function MyVerticallyCenteredModal(props) {

	// Dati necessari:
	// Name project
	// Name DB 
	// DBMS Type: MySQL, SQLite, Neo4j
	// description
	// port (?)

	return (
		<Modal
			{...props}
			size="lg"
			aria-labelledby="contained-modal-title-vcenter"
			centered
		>
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">
					Create new Grabit
		  </Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<div>
					<InputGroup className="mb-3">
						<InputGroup.Prepend>
							<InputGroup.Text id="basic-addon1">Grabit Name</InputGroup.Text>
						</InputGroup.Prepend>
						<FormControl
							placeholder="Name"
							aria-label="Name"
							aria-describedby="basic-addon1"
						/>
					</InputGroup>

					<InputGroup className="mb-3">

						<InputGroup.Prepend>
							<InputGroup.Text id="basic-addon2">Database Name</InputGroup.Text>
						</InputGroup.Prepend>
						<FormControl
							placeholder="DB Name"
							aria-label="DB Name"
							aria-describedby="basic-addon2"
						/>
					</InputGroup>
					<InputGroup className="mb-3">
						<InputGroup.Prepend>
							<InputGroup.Text id="basic-addon3">
								Database Type
      </InputGroup.Text>
						</InputGroup.Prepend>
						<FormControl id="basic-select" aria-describedby="basic-addon3" as="select">
							<option>MySQL</option>
							<option>SQLite</option>
							<option>Neo4j</option>
						</FormControl>
					</InputGroup>

					<InputGroup className="mb-3">
						<InputGroup.Prepend>
							<InputGroup.Text>Port</InputGroup.Text>
						</InputGroup.Prepend>
						<FormControl placeholder="Port Number" aria-label="Port" />
					</InputGroup>

					<InputGroup>
						<InputGroup.Prepend>
							<InputGroup.Text>Description</InputGroup.Text>
						</InputGroup.Prepend>
						<FormControl as="textarea" placeholder="Description (Optional)" aria-label="Description" />
					</InputGroup>
				</div>
			</Modal.Body>
			<Modal.Footer>
				<Button onClick={props.onHide}>Close</Button>
			</Modal.Footer>
		</Modal>
	);
}


export default function GrabitCreatorBtn() {
	const [modalShow, setModalShow] = React.useState(false);

	return (
		<>
			<Button variant="primary" onClick={() => setModalShow(true)}>
				New Project
      </Button>

			<MyVerticallyCenteredModal
				show={modalShow}
				onHide={() => setModalShow(false)}
			/>
		</>
	);
}


