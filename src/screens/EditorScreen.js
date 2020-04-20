import React from 'react';
import { GraphEditor } from '../components/GraphEditor/GraphEditor';
import { Container, Row, Col, Button } from 'react-bootstrap';
import ButtonRedux from '../components/ButtonRedux';

export class EditorScreen extends React.Component{

	constructor(props) {
		super(props);
		this.editor = React.createRef();
	}

	triggerGetJSON = () => {
		return this.editor.current.get_JSON()
	}

	render() {
		return (
			< Container fluid>
				<Row className="vh-100">
					<Col sm={2} className="px-0 border border-secondary">
						<Row className="mt-4 justify-content-center">
							<Button className="px-5" variant="outline-secondary">Carica</Button>{' '}
						</Row>
						<Row className="mt-2 justify-content-center">
							<ButtonRedux trigger={this.triggerGetJSON} variant="success" text="Nuovo"></ButtonRedux>
						</Row>
						<Row className="mt-2 justify-content-center">
							<ButtonRedux variant="outline-success" text="Salva"></ButtonRedux>
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


