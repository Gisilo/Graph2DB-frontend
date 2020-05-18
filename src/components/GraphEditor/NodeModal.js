import {useMutation} from "react-apollo";
import {Button, Modal} from "react-bootstrap";
import {ErrorMessage, Form, Formik} from "formik";
import {InputTitleLeft, TextAreaTitleLeft} from "../inputs";
import React from "react";

export function NodeModal(props) {

    return (
        <Modal
            {...props}
            show={props.show} onHide={props.onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered>

            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {props.nodeInfo && props.nodeInfo.data().label}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Formik
                    initialValues={{ nName: props.nodeInfo && props.nodeInfo.data().label,
                        nDesc: props.nodeInfo && props.nodeInfo.data().description}}
                    validate={values => {
                        const errors = {};
                        if (!values.nName) {
                            errors.nName = 'Required';
                        }
                        return errors;
                    }}
                    onSubmit={(data, { setSubmitting }) => {
                        setSubmitting(true);
                        console.log("submit: ", props.nodeInfo.data());

                        setSubmitting(false);
                        props.onHide();
                    }}
                    >
                    {({ values, isSubmitting }) => (
                        <Form>
                            <TextAreaTitleLeft id="ig1" title="Node Description" placeholder="Node Description" name="nDesc" />
                            <br/>
                            <ErrorMessage name="nName" component="div" />
                            <InputTitleLeft id="ig1" title="Node Name" placeholder="Node Name" name="nName" />
                            <Button disabled={isSubmitting} type="submit" variant="primary">Create</Button>
                        </Form>
                    )}
                </Formik>
            </Modal.Body>
        </Modal>
    );
}
