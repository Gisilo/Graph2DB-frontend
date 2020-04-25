import React from 'react';
import { InputGroup, Form } from 'react-bootstrap';
import { Field } from 'formik';



export const InputTitleLeft = ({id, title, placeholder, name, ...props}) =>  {
    return (
      <InputGroup className="mb-3">
      <InputGroup.Prepend>
        <InputGroup.Text id={id}>{title}</InputGroup.Text>
      </InputGroup.Prepend>
      <Field placeholder={placeholder} name={name} type="input" as={Form.Control}/>
    </InputGroup>
    );
}