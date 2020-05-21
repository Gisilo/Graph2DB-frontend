import {Button, Modal} from "react-bootstrap";
import {ErrorMessage, Field, FieldArray, Form, Formik} from "formik";
import {InputTitleLeft, TextAreaTitleLeft} from "../inputs";
import React, {useState} from "react";

export function NodeModal(props) {

    const [showPropsTab, setShowPropsTab] = useState(false);
    const [typeDom, setTypeDom] = useState("");

    const handleInputChange = () => {console.log("slfjee")};

    return (
        <Modal
            {...props}
            show={props.show} onHide={props.onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered>

            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Information of node {props.nodeInfo && props.nodeInfo.data().label}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Formik
                    initialValues={{ nName: props.nodeInfo && props.nodeInfo.data().label,
                        nDesc: props.nodeInfo && props.nodeInfo.data().description,
                        nProps: props.nodeInfo && props.nodeInfo.data().property}}
                    validate={values => {
                        console.log(values.nProps.map(x => x.domain));
                        const errors = {};
                        if (!values.nName) {
                            errors.nName = 'Required';
                        }
                        else if (props.nodesNameList &&
                            props.nodesNameList.filter(e => e !== props.nodeInfo.data().label).includes(values.nName)){
                            errors.nName = 'Name is already used';
                        }

                        if (new Set(values.nProps.map(x => x.name)).size !== values.nProps.length)
                            errors.nProps = 'Property name is already used';

                        if (values.nProps.map(x => x.domain).includes(""))
                            errors.nProps = 'Choose a domain of the property';

                        return errors;
                    }}
                    onSubmit={(data, { setSubmitting }) => {
                        setSubmitting(true);
                        console.log("submit: ", data);
                        props.callBack(data);
                        setSubmitting(false);
                        props.onHide();
                    }}
                    >
                    {({ values, isSubmitting }) => (
                        <Form>
                            <ErrorMessage name="nName" component="div" />
                            <ErrorMessage name="nProps" component="div" />
                            <InputTitleLeft id="ig1" title="Node Name" placeholder="Node Name" name="nName" />
                            <br/>
                            <TextAreaTitleLeft id="ig1" title="Node Description" placeholder="Node Description" name="nDesc" />

                            <br/>

                            <FieldArray name="nProps">
                                {(arrayHelpers) => (
                                    <div>
                                        <Button
                                            onClick={() =>{
                                                if(values.nProps.length === 0 || values.nProps[values.nProps.length-1].name!==""){
                                                    setShowPropsTab(true);
                                                    arrayHelpers.push({
                                                        name: "",
                                                        domain: "",
                                                        required: false,
                                                        pk: false,
                                                        default:null
                                                    })
                                                }
                                            }}
                                        >
                                            Add props
                                        </Button>
                                        <br/>
                                        <table>
                                            {showPropsTab && <tr>
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
                                                            <Field name={`nProps.${index}.domain`} as="select"
                                                                   onChange={handleInputChange}>
                                                                <option value="" label="Select domain" />
                                                                <option value="int">Integer</option>
                                                                <option value="float">Float</option>
                                                                <option value="string">String</option>
                                                                <option value="bool">Bool</option>
                                                            </Field>
                                                        </td>
                                                        <td>
                                                            {typeDom!=="" && <Field placeholder={"defuolt val"}
                                                                               name={`nProps.${index}.default`}
                                                                               type="input" as={Form.Control}/>}

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
                                                                values.nProps.splice(index, 1);
                                                                if (values.nProps.length === 0) setShowPropsTab(false)}}>
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
                        </Form>
                    )}
                </Formik>
            </Modal.Body>
        </Modal>
    );
}
