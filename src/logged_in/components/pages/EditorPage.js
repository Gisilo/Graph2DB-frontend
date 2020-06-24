import React from 'react';
import { GraphEditor } from '../GraphEditor/GraphEditor';
import Grid from "@material-ui/core/Grid";
import NavBar from "../navbar/NavBar";

export class EditorPage extends React.Component {

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

	heightOffset = 50; // magic numbeeeeer
	render() {
		console.log("grabit id passed to editor", this.props.location.grabitID)
		return (
			<Grid container>
				<Grid item xs={12}>
					<NavBar/>
				</Grid>
				<Grid item xs={12}>
					<GraphEditor ref={this.editor} heightOffset={this.heightOffset}/>
				</Grid>
			</Grid>
		)
	}

}

/*
<Col sm={2} className="px-0 border border-secondary">
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
</Col>
*/


