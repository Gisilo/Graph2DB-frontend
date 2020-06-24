import React from 'react';
import Grid from "@material-ui/core/Grid";
import NavBar from "../navbar/NavBar";
import {GrabitsPanel} from "../layout/GrabitsPanel";

function MainPage() {
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