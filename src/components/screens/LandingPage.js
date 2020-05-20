import React, { useRef, useEffect } from 'react';
import { GraphEditor } from '../GraphEditor/GraphEditor';


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

		<div className="col">
			<div className="row">
				Sezione con header
			</div>
			<div className="row">
				Sezione con mini editor e info sul sito
			</div>
			<div className="row">
				Sezione con altre info su cosa si può fare e form di registrazione
			</div>
			<div className="row">
				Sezione meet the team?	
			</div>
			<div className="row">
				Sezione pricing
			</div>
		</div>
	)
}