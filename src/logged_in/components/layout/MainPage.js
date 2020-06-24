import React from 'react';
import LabTabs from "./LabTabs";
import Grid from "@material-ui/core/Grid";
import NavBar from "../navbar/NavBar";
import {EditorScreen} from "../screens/EditorScreen";
import GrabitPage from "./GrabitsPage";
import {GrabitsPanel} from "./GrabitsPanel";

function MainPage(props) {
	return (
		<Grid container>
			<Grid item xs={12}>
				<NavBar/>
			</Grid>
			<Grid item xs={12}>
				<GrabitsPanel/>
			</Grid>
		</Grid>
	);
}

export default MainPage;