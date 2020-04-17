import React from 'react';
import { GraphEditor } from '../components/GraphEditor/GraphEditor';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux'


export function EditorScreen() {
	const handleClick = () => console.log('prova');
	const num = useSelector(state => state.numero)
	return (
		< Container fluid >
			<h1>NUMERO: {num}</h1>
			<Row className="vh-100">
				<Col sm={2} className="px-0 border border-secondary">
					<Row className="mt-4 justify-content-center">
						<Button className="px-5" variant="outline-secondary">Carica</Button>{' '}
					</Row>
					<Row className="mt-2 justify-content-center">
						<Button onCLick={handleClick} className="px-5" variant="success">Nuovo</Button>{' '}
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


