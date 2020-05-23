import React from 'react';
import { Grid, CssBaseline } from '@material-ui/core';
import { EditorScreen } from '../screens/EditorScreen';
import NavBar from './NavBar';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import TabsContainer from './TabsContainer';

const useStyles = makeStyles((theme) => ({
	toolbar: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'flex-end',
		padding: theme.spacing(0, 1),
		// necessary for content to be below app bar
		...theme.mixins.toolbar,
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing(3),
	},
}));


function Root(props) {

	const classes = useStyles();
	return (
		<div>
			<Grid container>
				<Grid item xs={12}>
					<NavBar />
				</Grid>
				<Grid item container xs={12}>
					{/* <main className={classes.content}>
						<div className={classes.toolbar} />
						<EditorScreen />
					</main> */}
					<TabsContainer/>
				</Grid>
			</Grid>
		</div>
	);
}

export default Root;