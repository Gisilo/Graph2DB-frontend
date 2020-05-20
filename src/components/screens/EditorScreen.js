import React from 'react';
import { GraphEditor } from '../GraphEditor/GraphEditor';
// import { SaveButton, CreateButton, DeleteButton, LoadButton} from '../buttons';

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
			< div className="container fluid">
				<div className="row">
					{/* <Col sm={2} className="px-0 border border-secondary">
						<Row className="mt-4 justify-content-center">
							<LoadButton variant="outline-secondary" loadGraph={this.triggerLoadGraph} text="Carica"/>
						</Row>
						<Row className="mt-2 justify-content-center">
							<CreateButton/>
						</Row>
						<Row className="mt-2 justify-content-center">
							<SaveButton trigger={this.triggerGetJSON} variant="outline-success" text="Salva"/>
						</Row>
						<Row className="mt-2 justify-content-center">
							<DeleteButton variant="outline-success" text="Elimina"/>
						</Row>
					</Col> */}
					<div className="col">
						<div className="container border shadow-lg">
							<GraphEditor height={500} ref={this.editor}/>
						</div>
					</div>
				</div>
			</div>

		)
	}

}


