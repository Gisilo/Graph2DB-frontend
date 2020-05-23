import React from 'react';
import { Grid, CssBaseline } from '@material-ui/core';
import SidePanel from "./SidePanel";
import { EditorScreen } from '../screens/EditorScreen';
import NavBar from './NavBar';
import { makeStyles, useTheme } from '@material-ui/core/styles';

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
	const [drawerOpen, setDrawerOpen] = React.useState(false);

	const handleDrawerOpen = () => setDrawerOpen(true);
	const handleDrawerClose = () => setDrawerOpen(false);

	return (
		<div>
			<CssBaseline />
			<NavBar openDrawer={handleDrawerOpen} isDrawerOpen={drawerOpen}/>
			<SidePanel isDrawerOpen={drawerOpen} closeDrawer={handleDrawerClose}/>
			<main className={classes.content}>
				<div className={classes.toolbar} />
				<EditorScreen />
			</main>
		</div>
	);
}

export default Root;