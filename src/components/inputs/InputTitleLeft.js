import React from 'react';
import { InputGroup, Form } from 'react-bootstrap';
import { Field } from 'formik';



export const InputTitleLeft = (props) =>  {
    return (
      <InputGroup className="mb-3">
      <InputGroup.Prepend>
        <InputGroup.Text id={props.id}>{props.title}</InputGroup.Text>
      </InputGroup.Prepend>
      <Field placeholder={props.placeholder} name={props.name} type="input" as={Form.Control}/>
    </InputGroup>
    );
}