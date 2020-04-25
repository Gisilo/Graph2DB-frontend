import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { Formik, ErrorMessage, Form } from 'formik';
import { InputTitleLeft } from '../inputs/InputTitleLeft';

function MyVerticallyCenteredModal(props) {

	const handleClick = () => {
		console.log("AO");
	}

	// Dati necessari:
	// Name project
	// Name DB 
	// DBMS Type: MySQL, SQLite, Neo4j
	// description
	// port (?)

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
				initialValues={	{ grabitName: "", dbName: "", dbType: "", description: "", port: "" }} 
				validate={values => {
					const errors = {};
					if (!values.grabitName) {
					  errors.grabitName = 'Required';
					}
					return errors;
				  }}
				onSubmit={(data, {setSubmitting}) => {
					setSubmitting(true);
					console.log("submit: ", data);
					// TODO make graphql request with apollo
					setSubmitting(false);
				} }>
					{({ values, isSubmitting }) => (
						<Form>
							<ErrorMessage name="grabitName" component="div" />
							<InputTitleLeft id="ig1" title="Grabit Name" placeholder="Grabit Name" name="grabitName" />
							<InputTitleLeft id="ig2" title="Database Name" placeholder="Database Name" name="dbName" />
							<InputTitleLeft id="ig3" title="Port Number" placeholder="Port Numer" name="port" />


							<Button disabled={isSubmitting} type="submit" variant="primary">Create</Button>
						<div>
							{JSON.stringify(values, null, 2)}
						</div>
						</Form>
					)}
					{/* <Formik initialValues={ { name:'' } } onSubmit={(data) => console.log(data)}>
				{({ values, handleChange, handleBlur, handleSubmit }) => (
					<form>
						<InputGroupLeftTitle onChange={handleChange} id="inputForm1" title="Grabit Name" label="Name"/>
						<InputGroupLeftTitle id="inputForm2" title="Database Name" label="DB Name"/>
						<InputGroupLeftTitle id="inputForm3" title="Database Type" type="select"
							options={dbOptions}/>
						<InputGroupLeftTitle id="inputForm4" title="Port" label="Port Number"/>
						<InputGroupLeftTitle id="inputForm5" title="Description" label="Description (Optional)" 
							type="textarea" size="sm"/>
       					<form/>
				)}
				</Formik> */}
				</Formik>
			</Modal.Body>
		</Modal>
	);
}


export default function GrabitCreatorBtn() {
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


