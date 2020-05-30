
import {ErrorMessage, Field, FieldArray, Form, Formik} from "formik";
import React, {useState} from "react";
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import { blue } from '@material-ui/core/colors';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Slide from '@material-ui/core/Slide';
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles({
    avatar: {
        backgroundColor: blue[100],
        color: blue[600],
    },
});

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export function NodeModal(props) {
    const classes = useStyles();
    const { onClose, open } = props;
    const [showPropsTab, setShowPropsTab] = useState(false);

    const handleClose = () => {
        onClose();
    };

    return (
        <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open} TransitionComponent={Transition}>
            <DialogTitle id="simple-dialog-title">Set backup account</DialogTitle>
            <DialogContent>
            <Formik
                initialValues={{ nName: props.nodeInfo ? props.nodeInfo.data().label : "",
                    nDesc: props.nodeInfo ? props.nodeInfo.data().description : "",
                    nProps: props.nodeInfo ? props.nodeInfo.data().property : []}}
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
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <ErrorMessage name="nName" component="div" />
                                    <ErrorMessage name="nProps" component="div" />
                                    <TextField id="outlined-basic" label="Node name" variant="outlined" name="nName" />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField multiline rows={2} variant="outlined" rowsMax={4} id="ig1" label="Node Description" name="nDesc" />
                                </Grid>

                                <Grid item xs={12}>
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
                                                                    <Field name={`nProps.${index}.domain`} as="select">
                                                                        <option value="" label="Select domain" />
                                                                        <option value="int">Integer</option>
                                                                        <option value="float">Float</option>
                                                                        <option value="string">String</option>
                                                                        <option value="bool">Bool</option>
                                                                    </Field>
                                                                </td>
                                                                <td>
                                                                    {values.nProps[index].domain!=="" &&
                                                                    <Field placeholder={"default val"}
                                                                           name={`nProps.${index}.default`}
                                                                           type="input" as={Form.Control}/>
                                                                    }

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
                                </Grid>

                                <Grid item xs={12} container justify="right">
                                    <Button disabled={isSubmitting} type="submit" variant="primary">Create</Button>
                                </Grid>

                            </Grid>
                        </Form>
                    )}
                </Formik>
            </DialogContent>

        </Dialog>
    );
}

NodeModal.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
};
