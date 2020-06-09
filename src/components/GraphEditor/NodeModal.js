
import {FieldArray, Form, Formik, useField} from "formik";
import React, {useState} from "react";
import PropTypes from 'prop-types';
import MyTextField from '../inputs/MyTextField'
import { Button, Grid, Slide, DialogContent, DialogTitle, Dialog, ListItem, List, IconButton,
    ListItemSecondaryAction, ListItemText, ListSubheader} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete';

import * as yup from 'yup'
import PropertyAdder from "./PropertyAdder";
import {makeStyles} from "@material-ui/core/styles";
import Select from "@material-ui/core/Select";


yup.addMethod(yup.mixed, 'checkWithField', function(field, msg) {
    return yup.mixed().test({
        name: 'checkWithField',
        message: msg,
        params: {
            reference: field.path,
        },
        test: function(value) {
            if (!value)
                return true;
            if (this.options.parent[field] === 'int') {
                console.log(value);
                return Number.isInteger(value);
            } else {
                return true
            }
        },
    });
});


const schema = yup.object({
    nName: yup.string().required("Node name required"),
    nDesc: yup.string(),
    nProps: yup.array().of(
        yup.object({
            name: yup.string().required("Name required"),
            domain: yup.mixed().oneOf(['int', 'float', 'string', 'bool', 'date', 'time', 'dateTime'])
                .required("Domain required"),
            pk: yup.boolean(),
            required: yup.boolean(),
            default: yup.mixed()
                .checkWithField('domain', 'Default value must be integer')
                .when('required', {is: true, then:yup.mixed().required("Default value required")})
        })
    )

});



const useStyles = makeStyles({
    root: {
        width: '80%',
        maxWidth: 'none'
    },
});

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});



export function NodeModal(props) {
    const classes = useStyles();
    const { onClose, open } = props;

    const handleClose = () => {
        onClose();
    };

    return (
        <Dialog fullWidth maxWidth={'md'} onClose={handleClose} aria-labelledby="simple-dialog-title" open={open} TransitionComponent={Transition}>
            {props.typeModal === "create" && <DialogTitle id="simple-dialog-title">Create Node</DialogTitle>}
            {props.typeModal === "edit" && <DialogTitle id="simple-dialog-title">Information node {props.nodeInfo.data().label}</DialogTitle>}
            <DialogContent>
            <Formik
                initialValues={{ nName: props.nodeInfo ? props.nodeInfo.data().label : "",
                    nDesc: props.nodeInfo ? props.nodeInfo.data().description : "",
                    nProps: props.nodeInfo ? props.nodeInfo.data().property : []}}
                validationSchema={schema}
                onSubmit={(data, { setSubmitting }) => {
                    setSubmitting(true);
                    console.log("submit: ", data);
                    props.callBack(data);
                    setSubmitting(false);
                    handleClose();
                }}
                >
                    {({ values, isSubmitting, setFieldValue }) => (
                        <Form>
                            <Grid container>
                                <Grid item container spacing={2}>
                                    <Grid item xs={12}>
                                        <MyTextField id="outlined-basic" label="Node Name" name="nName" type="input" variant={"outlined"}/>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <MyTextField multiline={true} rows={2} rowsMax={4} id="ig1" variant={"outlined"}
                                                     label="Node Description" name="nDesc" type="input"/>
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
