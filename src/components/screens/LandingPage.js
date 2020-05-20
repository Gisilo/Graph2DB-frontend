import React, { useRef, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
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

		<Col>
			<Row>
				Sezione con header
			</Row>
			<Row>
				Sezione con mini editor e info sul sito
			</Row>
			<Row>
				Sezione con altre info su cosa si può fare e form di registrazione
			</Row>
			<Row>
				Sezione meet the team?	
			</Row>
			<Row>
				Sezione pricing
			</Row>
		</Col>
	)
}