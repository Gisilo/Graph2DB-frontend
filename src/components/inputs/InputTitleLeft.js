import React from 'react';
import { InputGroup, Form } from 'react-bootstrap';
import { Field } from 'formik';

const InputTitleLeft = ({ id, title, placeholder, name, ...props }) => {
  return (
    <Form.Group controlId={id}>
      <InputGroup className="mb-3">
        <InputGroup.Prepend>
          <InputGroup.Text>{title}</InputGroup.Text>
        </InputGroup.Prepend>
        <Field placeholder={placeholder} name={name} type="input" as={Form.Control} />
      </InputGroup>
    </Form.Group>
  );
}

export default InputTitleLeft;