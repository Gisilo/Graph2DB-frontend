
import {ErrorMessage, Field, FieldArray, Form, Formik, useField} from "formik";
import React, {useState} from "react";
import PropTypes from 'prop-types';
import { blue } from '@material-ui/core/colors';
import MyTextField from '../inputs/MyTextField'
import {TextField, Button, Select, MenuItem, Checkbox, Grid, Slide,
    DialogContentText, DialogContent, DialogActions, InputLabel,
    makeStyles, DialogTitle, Dialog, FormControl} from '@material-ui/core'
import {
    TimePicker,
    DatePicker,
    DateTimePicker,
} from 'formik-material-ui-pickers';
import {MuiPickersUtilsProvider} from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns';
import * as yup from 'yup'


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
                                    <FieldArray name="nProps">
                                        {(arrayHelpers) => (
                                            <div>
                                                <Button
                                                    onClick={() =>{
                                                        setShowPropsTab(true);
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
                                                <br/>
                                                <Grid item xs={12} container>
                                                    {values.nProps.map((pro, index) => {
                                                        return (
                                                            <Grid item xs={12} key={pro.id} container>
                                                                <Grid item>
                                                                    <MyTextField id="outlined-basic" label="Property name"
                                                                               name={`nProps.${index}.name`} type="input"/>
                                                                </Grid>
                                                                <Grid item xs={12}>
                                                                    <FormControl>
                                                                    <InputLabel id="demo-simple-select-label">Select domain</InputLabel>
                                                                    <Field labelId="demo-simple-select-label" name={`nProps.${index}.domain`} type="select"
                                                                           as={Select}>
                                                                        <MenuItem value="int">Integer</MenuItem>
                                                                        <MenuItem value="float">Float</MenuItem>
                                                                        <MenuItem value="string">String</MenuItem>
                                                                        <MenuItem value="bool">Bool</MenuItem>
                                                                        <MenuItem value="date">Date</MenuItem>
                                                                        <MenuItem value="time">Time</MenuItem>
                                                                        <MenuItem value="dateTime">DateTime</MenuItem>
                                                                    </Field>
                                                                    </FormControl>
                                                                    <ErrorMessage component="p" name={`nProps.${index}.domain`}
                                                                        className="MuiFormHelperText-root MuiFormHelperText-contained Mui-error" />
                                                                </Grid>
                                                                <Grid item>
                                                                    {values.nProps[index].domain==="" &&

                                                                    <MyTextField label="Default value"
                                                                                 name={`nProps.${index}.default`} type="text" disabled="true"/>
                                                                    }
                                                                    {values.nProps[index].domain==="int" &&

                                                                    <MyTextField label="Default value"
                                                                                 name={`nProps.${index}.default`} type="text"/>
                                                                    }
                                                                    {values.nProps[index].domain==="float" &&

                                                                    <MyTextField label="Default value"
                                                                                 name={`nProps.${index}.default`} type="number"/>
                                                                    }
                                                                    {values.nProps[index].domain==="string" &&

                                                                    <MyTextField label="Default value"
                                                                                 name={`nProps.${index}.default`} type="text"/>
                                                                    }
                                                                    {values.nProps[index].domain==="bool" &&

                                                                    <Field label="Default value" as={Checkbox}
                                                                              name={`nProps.${index}.default`} type="checkbox"/>
                                                                    }
                                                                    {values.nProps[index].domain === "time" &&
                                                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                                        <Field component={TimePicker}
                                                                               name={`nProps.${index}.default`}
                                                                               label="Time"/>
                                                                    </MuiPickersUtilsProvider>
                                                                    }
                                                                    {values.nProps[index].domain === "date" &&
                                                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                                        <Field component={DatePicker}
                                                                               name={`nProps.${index}.default`}
                                                                               label="Date"/>
                                                                    </MuiPickersUtilsProvider>
                                                                    }
                                                                    {values.nProps[index].domain === "dateTime" &&
                                                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                                        <Field component={DateTimePicker}
                                                                               name={`nProps.${index}.default`}
                                                                               label="Date Time"/>
                                                                    </MuiPickersUtilsProvider>
                                                                    }
                                                                </Grid>
                                                                <Grid item>
                                                                    <Field type="checkbox" name={`nProps.${index}.pk`} as={Checkbox}/>
                                                                </Grid>
                                                                <Grid item>
                                                                    <Field type="checkbox" name={`nProps.${index}.required`} as={Checkbox}/>
                                                                </Grid>
                                                                <Grid item>
                                                                    <Button onClick={() => {
                                                                        console.log("arrayHelpers", arrayHelpers);
                                                                        console.log("nProps", values.nProps);
                                                                        arrayHelpers.remove(index);
                                                                        values.nProps.splice(index, 1);
                                                                        if (values.nProps.length === 0) setShowPropsTab(false)}}>
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
