import React from 'react';
import { GraphEditor } from '../components/GraphEditor/GraphEditor';
import { Container, Row, Col, Button } from 'react-bootstrap';
import ButtonRedux from '../components/ButtonRedux';

export function EditorScreen() {
	return (
		< Container fluid >
			<Row className="vh-100">
				<Col sm={2} className="px-0 border border-secondary">
					<Row className="mt-4 justify-content-center">
						<Button className="px-5" variant="outline-secondary">Carica</Button>{' '}
					</Row>
					<Row className="mt-2 justify-content-center">
						<ButtonRedux text="Nuovo"></ButtonRedux>
					</Row>
					<Row className="mt-2 justify-content-center">
						<Button className="px-5" variant="outline-success">Salva</Button>{' '}
					</Row>
				</Col>
				<Col sm={10}>
					<Container fluid>
						<GraphEditor />
					</Container>
				</Col>
			</Row>
		</Container >

	)

}


