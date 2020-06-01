
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
            {props.typeModal === "edit" && <DialogTitle id="simple-dialog-title">Information node</DialogTitle>}
            <DialogContent>
            <Formik
                initialValues={{ nName: props.nodeInfo ? props.nodeInfo.data().label : "",
                    nDesc: props.nodeInfo ? props.nodeInfo.data().description : "",
                    nProps: props.nodeInfo ? props.nodeInfo.data().property : []}}
                validate={values => {
                    console.log(values.nProps);
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

                    if (values.nProps.map(x => x.pk).filter(Boolean).length > 1)
                        errors.nProps = 'There are two or more primary key';

                    if (!values.nProps.filter(x => x.domain === 'int').reduce((sum, next) => sum && Number.isInteger(next.default), true))
                        errors.nProps = 'The default value mast be integer';

                    return errors;
                }}
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
                                    <ErrorMessage name="nProps" component="div" />
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
                                                        if(values.nProps.length === 0 ||
                                                            values.nProps[values.nProps.length-1].name!==""){
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
                                                <Grid item xs={12} container>
                                                    {values.nProps.map((pro, index) => {
                                                        return (
                                                            <Grid item xs={12} key={pro.id} container>
                                                                <Grid item>
                                                                    <MyTextField id="outlined-basic" label="Property name"
                                                                               name={`nProps.${index}.name`} type="input"/>
                                                                </Grid>
                                                                <Grid item>
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
                                                                </Grid>
                                                                <Grid item>
                                                                    {values.nProps[index].domain==="int" &&

                                                                    <MyTextField id="outlined-basic" label="Default value"
                                                                                 name={`nProps.${index}.default`} type="number"/>
                                                                    }
                                                                    {values.nProps[index].domain==="float" &&

                                                                    <MyTextField id="outlined-basic" label="Default value"
                                                                                 name={`nProps.${index}.default`} type="number"/>
                                                                    }
                                                                    {values.nProps[index].domain==="string" &&

                                                                    <MyTextField id="outlined-basic" label="Default value"
                                                                                 name={`nProps.${index}.default`} type="text"/>
                                                                    }
                                                                    {values.nProps[index].domain==="bool" &&

                                                                    <Checkbox id="outlined-basic" label="Default value"
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
                                                                    <Checkbox type="checkbox" name={`nProps.${index}.pk`}/>
                                                                </Grid>
                                                                <Grid item>
                                                                    <Checkbox type="checkbox" name={`nProps.${index}.required`}/>
                                                                </Grid>
                                                                <Grid item>
                                                                    <Button onClick={() => {
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
                                    {props.typeModal === 'edit'&& <Button disabled={isSubmitting} type="submit" variant="primary">Edit</Button>}
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
