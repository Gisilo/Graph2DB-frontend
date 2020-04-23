import React from 'react';
import { GraphEditor } from '../GraphEditor/GraphEditor';
import { Container, Row, Col, Button } from 'react-bootstrap';
import SaveButton from '../SaveButton';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

export class EditorScreen extends React.Component{

	constructor(props) {
		super(props);
		this.editor = React.createRef();
	}

	triggerGetJSON = () => {
		return this.editor.current.get_JSON()
	};

	onNewClick = () => {
		MySwal.fire({
			title: <p>Hello World</p>,
			footer: 'Copyright 2018',
			onOpen: () => {
			  // `MySwal` is a subclass of `Swal`
			  //   with all the same instance & static methods
			//   MySwal.clickConfirm()
			}
		  })
	}

	render() {
		return (
			< Container fluid>
				<Row className="vh-100">
					<Col sm={2} className="px-0 border border-secondary">
						<Row className="mt-4 justify-content-center">
							<Button onClick={() => console.log("ao")} className="px-5" variant="outline-secondary">Carica</Button>{' '}
						</Row>
						<Row className="mt-2 justify-content-center">
							<Button onClick={this.onNewClick} className="px-5" variant="success">Nuovo</Button>
						</Row>
						<Row className="mt-2 justify-content-center">
							<SaveButton trigger={this.triggerGetJSON} 
							variant="outline-success" text="Salva"/>
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


