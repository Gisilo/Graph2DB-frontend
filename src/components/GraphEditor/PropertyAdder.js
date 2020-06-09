import {Checkbox, FormControl, Grid, IconButton, InputLabel, MenuItem, Select, TextField} from "@material-ui/core";
import MyTextField from "../inputs/MyTextField";
import {ErrorMessage, Field, useField} from "formik";
import {MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import {DatePicker, DateTimePicker, TimePicker} from "formik-material-ui-pickers";
import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import FormHelperText from "@material-ui/core/FormHelperText";
import {makeStyles} from "@material-ui/core/styles";


const useStyles = makeStyles({
    label: {
        marginLeft: 6,
        marginBottom:2
    },
});


export default function PropertyAdder(props) {

    const {property, index, deleteProp} = props;


    const MySelect = ({ ...props }) => {

        const classes = useStyles();

        const [field, meta] = useField(props);
        const errorText = meta.error && meta.touched ? meta.error : "";
        return(<FormControl fullWidth>
            <InputLabel>Select domain</InputLabel>
            <Select {...field} type="select" helperText={errorText} error={!!errorText} onChange={(e)=>{
                props.setFieldValue(props.resetDefault, null);
                field.onChange(e)}}>
                <MenuItem value="int">Integer</MenuItem>
                <MenuItem value="float">Float</MenuItem>
                <MenuItem value="string">String</MenuItem>
                <MenuItem value="bool">Bool</MenuItem>
                <MenuItem value="date">Date</MenuItem>
                <MenuItem value="time">Time</MenuItem>
                <MenuItem value="dateTime">DateTime</MenuItem>
            </Select>
            <ErrorMessage component="p" name={`nProps.${index}.domain`}
                          className="MuiFormHelperText-root MuiFormHelperText-contained Mui-error"/>
        </FormControl>)
    };

    return(
        <Grid item xs={12} container spacing={1}>
        <Grid item xs={3}>
            <MyTextField id="outlined-basic" label="Property name"
                         name={`nProps.${index}.name`} type="input"/>
        </Grid>
        <Grid item xs={3}>
            <MySelect setFieldValue={props.setFieldValue} resetDefault={`nProps.${index}.default`} labelId="demo-simple-select-label" name={`nProps.${index}.domain`}/>
        </Grid>
        <Grid item xs={3}>
             {
                 switchDefault(property.domain, `nProps.${index}.default`)
             }
        </Grid>
        <Grid item xs={1}>
            <Field type="checkbox" name={`nProps.${index}.pk`} as={Checkbox}/>
        </Grid>
        <Grid item xs={1}>
            <Field type="checkbox" name={`nProps.${index}.required`} as={Checkbox}/>
        </Grid>
        <Grid item xs={1}>
            <IconButton edge="end" aria-label="delete"
                        onClick={deleteProp}>
                <DeleteIcon />
            </IconButton>
        </Grid>
    </Grid>
    )
}

const switchDefault = (dom, def) => {

    switch (dom) {
        case "int":
            return <MyTextField label="Default value" name={def} type="number" defaultValue="Default Value"/>;
        case "float":
            return <MyTextField label="Default value" name={def} type="number"/>;
        case "string":
            return <MyTextField label="Default value" name={def} type="text"/>;
        case "bool":
            return <Field label="Default value" as={Checkbox} name={def} type="checkbox"/>;
        case "time":
            return (<MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Field component={TimePicker} name={def} label="Time"/>
            </MuiPickersUtilsProvider>);
        case "date":
            return (<MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Field component={DatePicker} name={def} label="Date"/>
            </MuiPickersUtilsProvider>);
        case "dateTime":
            return (<MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Field component={DateTimePicker} name={def} label="Date Time"/>
            </MuiPickersUtilsProvider>);
        default:
            return <MyTextField label="Default value" name={def} type="text" disabled="true"/>;
    }

};
