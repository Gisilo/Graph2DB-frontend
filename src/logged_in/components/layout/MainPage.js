import React from 'react';
import { Grid } from '@material-ui/core';
import NavBar from './NavBar';
import TabsContainer from './TabsContainer';


function MainPage(props) {
	return (
		<div>
			<Grid container>
				<Grid item xs={12}>
					<NavBar />
				</Grid>
				<Grid item container xs={12}>
					<TabsContainer/>
				</Grid>
			</Grid>
		</div>
	);
}

export default MainPage;