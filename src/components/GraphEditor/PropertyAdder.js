import {Checkbox, FormControl, Grid, IconButton, InputLabel, MenuItem, Select, TextField} from "@material-ui/core";
import MyTextField from "../inputs/MyTextField";
import {ErrorMessage, Field, useField} from "formik";
import {
    KeyboardDatePicker,
    KeyboardDateTimePicker,
    KeyboardTimePicker,
    MuiPickersUtilsProvider
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import {DatePicker, DateTimePicker, TimePicker} from "formik-material-ui-pickers";
import React, {useState} from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import FormHelperText from "@material-ui/core/FormHelperText";
import {makeStyles} from "@material-ui/core/styles";


const useStyles = makeStyles({
    label: {
        marginLeft: 6,
        marginBottom:2
    },
    datePicker: {
        marginTop: 16
    }
});


export default function PropertyAdder(props) {


    const [selectedDate, setSelectedDate] = React.useState(null);

    const {property, index, deleteProp} = props;

    const handleDateChange = (d) => {
        console.log(d);
        console.log(property);
        setSelectedDate(d);
        property.default = d;
    };

    const MySelect = ({ ...props }) => {

        const [field, meta] = useField(props);
        const errorText = meta.error && meta.touched ? meta.error : "";
        return(<FormControl fullWidth>
            <InputLabel>Select domain</InputLabel>
            <Select {...field} type="select" helperText={errorText} error={!!errorText} onChange={(e)=>{
                setSelectedDate(null);
                props.setFieldValue(props.resetDefault, "");
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

    const classes = useStyles();

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
                 switchDefault(property.domain, `nProps.${index}.default`, selectedDate, handleDateChange, classes.datePicker)
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



const switchDefault = (dom, def, selectedDate, handleDateChange, style) => {

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
                <KeyboardTimePicker
                    label="Default value"
                    placeholder="hh:mm"
                    value={selectedDate}
                    onChange={handleDateChange}
                    mask="__:__ _M"
                />
            </MuiPickersUtilsProvider>);
        case "date":
            return (
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                        label="Default value"
                        placeholder="mm/dd/yyyy"
                        value={selectedDate}
                        onChange={handleDateChange}
                        format="MM/dd/yyyy"/>
                </MuiPickersUtilsProvider>);
        case "dateTime":
            return (
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDateTimePicker
                        label="Default value"
                        placeholder="yyyy/mm/dd hh:mm"
                        mask="____/__/__ __:__ _M"
                        value={selectedDate}
                        onChange={handleDateChange}
                        format="yyyy/MM/dd hh:mm a"
                    />
            </MuiPickersUtilsProvider>);
        default:
            return <MyTextField label="Default value" name={def} type="text" disabled="true"/>;
    }

};
