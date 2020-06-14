import {Button, Modal} from "react-bootstrap";
import {ErrorMessage, Form, Formik, FieldArray, Field} from "formik";
import {InputTitleLeft, TextAreaTitleLeft} from "../inputs";
import React from "react";

export function CreateNodeModal(props) {

    let showHeader = false;

    return (
        <Modal
            {...props}
            show={props.show} onHide={props.onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered>

            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Create New Node
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Formik
                    initialValues={{ nName: "", nDesc: "",
                        nProps: []}}
                    validate={values => {
                        const errors = {};
                        console.log(props.nodesNameList);
                        if (!values.nName) {
                            errors.nName = 'Required';
                        }
                        else if (props.nodesNameList && props.nodesNameList.includes(values.nName)){
                            errors.nName = 'Name is already used';
                        }

                        if (new Set(values.nProps.map(x => x.name)).size !== values.nProps.length)
                            errors.nProps = 'Property name is already used';

                        if (values.nProps.map(x => x.pk).filter(Boolean).length > 1)
                            errors.nProps = 'There are two or more primary key';

                        return errors;
                    }}
                    onSubmit={(data, { setSubmitting }) => {
                        setSubmitting(true);
                        //console.log("num true: ", data.nProps.map(x => x.pk).filter(Boolean).length);
                        props.callBack(data.nName, data.nDesc, data.nProps);
                        setSubmitting(false);
                        props.onHide();
                    }}
                >
                    {({ values, isSubmitting }) => (
                        <Form>

                            <ErrorMessage name="nName" component="div" />
                            <ErrorMessage name="nProps" component="div" />
                            <InputTitleLeft id="ig1" title="New Node Name" placeholder="New Node Name" name="nName" />
                            <TextAreaTitleLeft id="ig1" title="Node Description" placeholder="Insert Node Description" name="nDesc" />
                            <br/>

                            <FieldArray name="nProps">
                                {arrayHelpers => (
                                    <div>
                                        <Button
                                            onClick={() =>{
                                                if(values.nProps.length === 0 || values.nProps[values.nProps.length-1].name!==""){
                                                    showHeader = true;
                                                    arrayHelpers.push({
                                                        name: "",
                                                        domain: "",
                                                        required: false,
                                                        pk: false
                                                    })
                                                }
                                            }}
                                        >
                                            Add props
                                        </Button>
                                        <br/>
                                        <table>
                                            {showHeader && <tr>
                                                <th>Props name</th>
                                                <th>Domain</th>
                                                <th>Primary key</th>
                                                <th>Required</th>
                                            </tr>}
                                        {values.nProps.map((pro, index) => {
                                            return (
                                                <tr key={pro.id}>
                                                    <td>
                                                        <Field placeholder="property name" name={`nProps.${index}.name`}
                                                               type="input" as={Form.Control} />
                                                    </td>
                                                    <td>
                                                    <Field name={`nProps.${index}.domain`} as="select">
                                                        <option value="" label="Select domain" />
                                                        <option value="int">Integer</option>
                                                        <option value="float">Float</option>
                                                        <option value="string">String</option>
                                                        <option value="bool">Bool</option>
                                                    </Field>
                                                    </td>
                                                    <td>
                                                    <Field type="checkbox" name={`nProps.${index}.pk`}/>
                                                    </td>
                                                    <td>
                                                    <Field type="checkbox" name={`nProps.${index}.required`}/>
                                                    </td>
                                                    <td>
                                                        <Button onClick={() => {
                                                            arrayHelpers.remove(index);
                                                            if (values.nProps.length === 0) showHeader = false;}}>
                                                            x
                                                        </Button>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                        </table>
                                    </div>
                                )}
                            </FieldArray>

                            <br/>

                            <Button disabled={isSubmitting} type="submit" variant="primary">Create</Button>
                            <pre>{JSON.stringify(values, null, 2)}</pre>
                        </Form>
                    )}
                </Formik>
            </Modal.Body>
        </Modal>
    );
}


