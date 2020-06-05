import {Checkbox, FormControl, Grid, InputLabel, MenuItem, Select} from "@material-ui/core";
import MyTextField from "../inputs/MyTextField";
import {ErrorMessage, Field} from "formik";
import {MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import {DatePicker, DateTimePicker, TimePicker} from "formik-material-ui-pickers";
import React from "react";




export default function PropertyAdder(props) {

    const {property, index} = props;

    return(
        <Grid item xs={12} container>
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
                          className="MuiFormHelperText-root MuiFormHelperText-contained Mui-error"/>
        </Grid>
        <Grid item>
             {
                 switchDefault(property.domain, `nProps.${index}.default`)
             }
        </Grid>
        <Grid item>
            <Field type="checkbox" name={`nProps.${index}.pk`} as={Checkbox}/>
        </Grid>
        <Grid item>
            <Field type="checkbox" name={`nProps.${index}.required`} as={Checkbox}/>
        </Grid>
    </Grid>
    )
}

const switchDefault = (dom, def) => {

    switch (dom) {
        case "int":
            return <MyTextField label="Default value" name={def} type="text"/>;
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
