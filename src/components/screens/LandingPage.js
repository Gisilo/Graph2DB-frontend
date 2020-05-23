import React, { useRef, useEffect } from 'react';
import { Grid, Paper } from '@material-ui/core';
import NavBar from '../../components/layout/navbar/NavBar';
import VerticalTabs from '../layout/VerticalTabs';

// import { GraphEditor } from '../GraphEditor/GraphEditor';


// Usare lo state per aggiornare la width dell'editor
export const LandingPage = () => {

	const parentRef = useRef(null);
	let w = 0;

	useEffect(() => {

		if (parentRef.current) {

			let parentHeight = parentRef.current.offsetHeight;
			let parentWidth = parentRef.current.offsetWidth;
			w = parentWidth;
			console.log(parentWidth, parentHeight);
		}

	}, [parentRef]);

	console.log("ao", w);
	return (
		<Grid container direction="row">
			<Grid item>
				<VerticalTabs/>
			</Grid>
			<Grid item>
				Sezione con header
			</Grid>
			<Grid item>
				Sezione con mini editor e info sul sito
			</Grid>
			<Grid item>
				Sezione con altre info su cosa si può fare e form di registrazione
			</Grid>
			<Grid item>
				Sezione meet the team?
			</Grid>
			<Grid item>
				Sezione pricing
			</Grid>
		</Grid>
	)
}