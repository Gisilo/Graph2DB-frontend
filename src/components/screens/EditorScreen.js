import React from 'react';
import { GraphEditor } from '../GraphEditor/GraphEditor';
import { Container, Row, Col, Button } from 'react-bootstrap';
import SaveButton from '../SaveButton';
import DeleteButton from "../DeleteButton";
import LoadButton from "../LoadButton";


export class EditorScreen extends React.Component{

	constructor(props) {
		super(props);
		this.editor = React.createRef();
	}

	triggerGetJSON = () => {
		return this.editor.current.get_JSON()
	};

	render() {
		return (
			< Container fluid>
				<Row className="vh-100">
					<Col sm={2} className="px-0 border border-secondary">
						<Row className="mt-4 justify-content-center">
							<LoadButton variant="outline-secondary" text="Carica"/>
						</Row>
						<Row className="mt-2 justify-content-center">
							<Button variant="success" text="Nuovo">Nuovo</Button>{' '}
						</Row>
						<Row className="mt-2 justify-content-center">
							<SaveButton trigger={this.triggerGetJSON} variant="outline-success" text="Salva"/>
						</Row>
						<Row className="mt-2 justify-content-center">
							<DeleteButton variant="outline-success" text="Elimina"/>
						</Row>
					</Col>
					<Col sm={10}>
						<Container fluid>
							<GraphEditor ref={this.editor}/>
						</Container>
					</Col>
				</Row>
			</Container>

		)
	}

}


