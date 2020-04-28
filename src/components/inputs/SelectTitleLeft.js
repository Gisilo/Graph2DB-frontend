import React from 'react';
import { InputGroup, Form } from 'react-bootstrap';
import { Field, useField } from 'formik';


const MySelect = (props) => {
	const [field] = useField(props);

	return (
		<Form.Control {...field} as="select">
			{props.options && props.options.map(o => <option>{o}</option>)}
		</Form.Control>
	);
};

const SelectTitleLeft = ({ id, title, name, options, ...props }) => {
	return (
		<InputGroup className="mb-3">
			<InputGroup.Prepend>
				<InputGroup.Text id={id}>{title}</InputGroup.Text>
			</InputGroup.Prepend>
			<Field name={name} options={options} type="input" as={MySelect} />
		</InputGroup>
	);
};

export default SelectTitleLeft;