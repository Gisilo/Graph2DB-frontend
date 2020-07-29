
import {FieldArray, Form, Formik} from "formik";
import React from "react";
import PropTypes from 'prop-types';
import FormikTextField from '../../../common/components/FormikTextField'
import { Button, Grid, Slide, DialogContent, DialogTitle, Dialog } from '@material-ui/core'

import PropertyAdder from "./PropertyAdder";
import { NODESCHEMA } from './ValidationModal';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const schema = NODESCHEMA;

export function NodeModal(props) {
    const { onClose, open } = props;

    const handleClose = () => {
        onClose();
    };

    function onKeyDown(keyEvent) {
        if ((keyEvent.charCode || keyEvent.keyCode) === 13) {
            keyEvent.preventDefault();
        }
    }

    return (
        <Dialog fullWidth maxWidth={'md'} onClose={handleClose} aria-labelledby="simple-dialog-title" open={open} TransitionComponent={Transition}>
            {props.typeModal === "create" && <DialogTitle id="simple-dialog-title">Create Node</DialogTitle>}
            {props.typeModal === "edit" && <DialogTitle id="simple-dialog-title">Information node {props.nodeInfo && props.nodeInfo.label}</DialogTitle>}
            <DialogContent>
            <Formik
                initialValues={{ nName: props.nodeInfo ? props.nodeInfo.label : "",
                    nDesc: props.nodeInfo ? props.nodeInfo.description : "",
                    nProps: props.nodeInfo ? props.nodeInfo.properties : []}}
                validationSchema={schema}
                validate={(values)=>{
                    if (props.typeModal === "create" && props.nameList.includes(values.nName))
                        return {nName: "Name already used"};
                    else if (props.typeModal === "edit") {
                        const oldName = props.nodeInfo ? props.nodeInfo.label : "";
                        if (oldName !== values.nName && props.nameList.includes(values.nName))
                             return {nName: "Name already used"};
                        else if (oldName === values.nName && props.nameList.filter(x => x === values.nName).length !== 1)
                            return {nName: "Name already used"};
                    }
                }}
                onSubmit={(data, { setSubmitting }) => {
                    setSubmitting(true);
                    console.log("submit: ", data);
                    props.callBack(data);
                    setSubmitting(false);
                    handleClose();
                }}
                >
                    {({ values, isSubmitting, setFieldValue }) => (
                        <Form onKeyDown={onKeyDown}>
                            <Grid container>
                                <Grid item container spacing={2}>
                                    <Grid item xs={12}>
                                        <FormikTextField autoFocus id="outlined-basic" label="Node Name" name="nName" type="input" variant="outlined" required fullWidth/>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormikTextField multiline rows={2} rowsMax={4} id="ig1" variant="outlined"
                                                         label="Node Description" name="nDesc" type="input" fullWidth/>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <FieldArray name="nProps">

                                            {arrayHelpers => (
                                                <>
                                                    <Button
                                                        onClick={() =>{
                                                            const newProp = {
                                                                name: "",
                                                                domain: "",
                                                                default: "",
                                                                required: false,
                                                                pk: false
                                                            };
                                                            arrayHelpers.push(newProp);
                                                        }}
                                                    >
                                                        Add props
                                                    </Button>
                                                    <Grid container spacing={1}>
                                                        {values.nProps.map((pro, index) => {
                                                            return(
                                                                <Grid container item key={pro.id}>
                                                                    <PropertyAdder setFieldValue={setFieldValue} property={pro}
                                                                                   index={index} deleteProp={()=> {
                                                                        arrayHelpers.remove(index);
                                                                    }}/>
                                                                </Grid>
                                                            )
                                                        })}
                                                    </Grid>

                                                </>
                                                        )}
                                        </FieldArray>
                                    </Grid>

                                    <Grid item xs={12} container justify="right">
                                        {props.typeModal === 'create'&& <Button disabled={isSubmitting} type="submit" variant="primary">Create</Button>}
                                        {props.typeModal === 'edit'&& <Button disabled={isSubmitting} type="submit" variant="primary">Save</Button>}
                                    </Grid>

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
