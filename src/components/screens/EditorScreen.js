import React from 'react';
import { GraphEditor } from '../GraphEditor/GraphEditor';
import { Container, Row, Col, Button } from 'react-bootstrap';
import SaveButton from '../SaveButton';
import GrabitCreatorBtn from '../buttons/GrabitCreatorBtn';
import DeleteButton from "../DeleteButton";
import LoadButton from "../LoadButton";

export class EditorScreen extends React.Component{

	constructor(props) {
		super(props);
		this.editor = React.createRef();
	}

	triggerGetJSON = () => {
		return this.editor.current.getJSON()
	};

	triggerLoadGraph = (newGraph) => {
		return this.editor.current.loadGraph(newGraph)
	};

	render() {
		return (
			< Container fluid>
				<Row className="vh-100">
					<Col sm={2} className="px-0 border border-secondary">
						<Row className="mt-4 justify-content-center">
							<LoadButton variant="outline-secondary" loadGraph={this.triggerLoadGraph} text="Carica"/>
						</Row>
						<Row className="mt-2 justify-content-center">
							<GrabitCreatorBtn/>
						</Row>
						<Row className="mt-2 justify-content-center">
							<SaveButton trigger={this.triggerGetJSON} variant="outline-success" text="Salva"/>
						</Row>
						<Row className="mt-2 justify-content-center">
							<DeleteButton variant="outline-success" text="Elimina"/>
						</Row>
					</Col>
					<Col sm={10}>
						<Container className="border shadow-lg" fluid>
							<GraphEditor className="border" ref={this.editor}/>
						</Container>
					</Col>
				</Row>
			</Container>

		)
	}

}


