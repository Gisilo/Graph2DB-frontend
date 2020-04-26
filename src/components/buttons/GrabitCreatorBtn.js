import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { Formik, ErrorMessage, Form } from 'formik';
import { InputTitleLeft, TextAreaTitleLeft, SelectTitleLeft } from '../inputs';

import gql from 'graphql-tag'
import { withApollo } from 'react-apollo';



function MyVerticallyCenteredModal(props) {

	const dbOptions = ['MySQL', 'SQLite', 'Neo4j'];

	return (
		<Modal
			{...props}
			size="lg"
			aria-labelledby="contained-modal-title-vcenter"
			centered
		>
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">
					Create new Grabit
		  </Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Formik
					initialValues={{ grabitName: "", dbName: "", dbType: dbOptions[0], description: "" }}
					validate={values => {
						const errors = {};
						if (!values.grabitName) {
							errors.grabitName = 'Required';
						}
						return errors;
					}}
					onSubmit={(data, { setSubmitting }) => {
						setSubmitting(true);
						console.log("submit: ", data);
						// TODO make graphql request with apollo

						setSubmitting(false);
					}}>
					{({ values, isSubmitting }) => (
						<Form>
								<ErrorMessage name="grabitName" component="div" />
								<InputTitleLeft id="ig1" title="Grabit Name" placeholder="Grabit Name" name="grabitName" />
								<InputTitleLeft id="ig2" title="Database Name" placeholder="Database Name" name="dbName" />
								<SelectTitleLeft id="ig3" title="Database Type" options={dbOptions} name="dbType"/>
								<TextAreaTitleLeft id="ig4" title="Description" placeholder="Description (Optional)" name="description" />

								<Button disabled={isSubmitting} type="submit" variant="primary">Create</Button>
							<div>
								{JSON.stringify(values, null, 2)}
							</div>
						</Form>
					)}
				</Formik>
			</Modal.Body>
		</Modal>
	);
}


function GrabitCreatorBtn() {
	const [modalShow, setModalShow] = React.useState(false);

	return (
		<>
			<Button variant="primary" onClick={() => setModalShow(true)}>
				New Project
      </Button>

			<MyVerticallyCenteredModal
				show={modalShow}
				onHide={() => setModalShow(false)}
			/>
		</>
	);
}


export default withApollo(GrabitCreatorBtn);


