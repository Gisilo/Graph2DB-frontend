
import {ErrorMessage, Field, FieldArray, Form, Formik} from "formik";
import React from "react";
import PropTypes from 'prop-types';
import MyTextField from '../inputs/MyTextField'
import { Button, Select, MenuItem, Checkbox, Grid, Slide, DialogContent, InputLabel,
    DialogTitle, Dialog, FormControl, ListItem, List} from '@material-ui/core'
import {
    TimePicker,
    DatePicker,
    DateTimePicker,
} from 'formik-material-ui-pickers';
import {MuiPickersUtilsProvider} from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns';
import * as yup from 'yup'
import ListSubheader from "@material-ui/core/ListSubheader";
import PropertyAdder from "./PropertyAdder";


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
                console.log(Number.isInteger(value));
                return Number.isInteger(value);
            } else {
                return true
            }
        },
    });
});


const schema = yup.object({
    nName: yup.string().required("Node name is required"),
    nDesc: yup.string(),
    nProps: yup.array().of(
        yup.object({
            name: yup.string().required("Delete property or insert name"),
            domain: yup.mixed().oneOf(['int', 'float', 'string', 'bool', 'date', 'time', 'dateTime'])
                .required("Delete property or insert domain"),
            pk: yup.boolean(),
            required: yup.boolean(),
            default: yup.mixed()
                .checkWithField('domain', 'Default value must be integer')
                .when('required', {is: true, then:yup.mixed().required("If property is required you must insert a default value")})


        })
    )

});


/*
const useStyles = makeStyles({
    avatar: {
        backgroundColor: blue[100],
        color: blue[600],
    },
});*/

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});



export function NodeModal(props) {
    //const classes = useStyles();
    const { onClose, open } = props;

    const handleClose = () => {
        onClose();
    };

    return (
        <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open} TransitionComponent={Transition}>
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
                    {({ values, isSubmitting }) => (
                        <Form>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <MyTextField id="outlined-basic" label="Node Name" name="nName" type="input"/>
                                </Grid>
                                <Grid item xs={12}>
                                    <MyTextField multiline={true} rows={2} rowsMax={4} id="ig1"
                                                 label="Node Description" name="nDesc" type="input"/>
                                </Grid>

                                <Grid item xs={12}>
                                    <List component="nav"
                                          aria-labelledby="nested-list-subheader"
                                          subheader={
                                              <ListSubheader component="div" id="nested-list-subheader">
                                                  Nested List Items
                                              </ListSubheader>
                                          }>
                                    <FieldArray name="nProps">
                                        {(arrayHelpers) => (
                                            <div>
                                                <Button
                                                    onClick={() =>{
                                                        arrayHelpers.push({
                                                            name: "",
                                                            domain: "",
                                                            required: false,
                                                            pk: false,
                                                            default: null
                                                        })
                                                    }}
                                                >
                                                    Add props
                                                </Button>

                                                <Grid item xs={12} container>
                                                    {values.nProps.map((pro, index) => {
                                                        return (
                                                            <Grid container key={pro.id}>
                                                                <Grid item >
                                                                    <PropertyAdder property={pro} index={index}/>
                                                                </Grid>
                                                                <Grid item>
                                                                    <Button onClick={() => {
                                                                        arrayHelpers.remove(index);
                                                                        values.nProps.splice(index, 1);
                                                                    }}>
                                                                        x
                                                                    </Button>
                                                                </Grid>
                                                            </Grid>
                                                        );
                                                    })}
                                                </Grid>
                                            </div>
                                        )}
                                    </FieldArray>
                                    </List>
                                </Grid>

                                <Grid item xs={12} container justify="right">
                                    {props.typeModal === 'create'&& <Button disabled={isSubmitting} type="submit" variant="primary">Create</Button>}
                                    {props.typeModal === 'edit'&& <Button disabled={isSubmitting} type="submit" variant="primary">Save</Button>}
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
