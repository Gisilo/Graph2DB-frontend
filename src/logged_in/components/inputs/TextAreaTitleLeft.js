import React from 'react';
import { InputGroup, Form } from 'react-bootstrap';
import { Field, useField } from 'formik';


const MyTextArea = (props) => {
  const [field] = useField(props);

  return (
    <Form.Control {...field} placeholder={props.placeholder} as="textarea"/>
  );
};

const TextAreaTitleLeft = ({ id, title, placeholder, name, ...props }) => {
  return (
    <InputGroup className="mb-3">
      <InputGroup.Prepend>
        <InputGroup.Text id={id}>{title}</InputGroup.Text>
      </InputGroup.Prepend>
      <Field placeholder={placeholder} name={name} type="input" as={MyTextArea} />
    </InputGroup>
  );
};

export default TextAreaTitleLeft;