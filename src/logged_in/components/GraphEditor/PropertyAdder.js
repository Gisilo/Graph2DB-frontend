import {Box, Checkbox, FormControl, Grid, IconButton, InputLabel, MenuItem, Select} from "@material-ui/core";
import FormikTextField from "../../../common/components/FormikTextField";
import {ErrorMessage, useField} from "formik";
import {
    KeyboardDatePicker,
    KeyboardDateTimePicker,
    KeyboardTimePicker,
    MuiPickersUtilsProvider
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import React, {useState} from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import Slider from "@material-ui/core/Slider";
import FormControlLabel from "@material-ui/core/FormControlLabel";

export default function PropertyAdder(props) {

    const [selectedDate, setSelectedDate] = useState(null);
    const {property, index, deleteProp} = props;

    const handleDateChange = (d) => {
        console.log(d);
        console.log(property);
        setSelectedDate(d);
        property.default = d;
    };

    const handleSliderChange = (v) => {
        console.log(v);
        console.log(property);
        property.default = v;
    };

    const ModalSelect = ({ ...props }) => {

        const [field, meta] = useField(props);
        const errorText = meta.error && meta.touched ? meta.error : "";
        return(<FormControl fullWidth>
            <InputLabel>Select domain</InputLabel>
            <Select required {...field} type="select" helperText={errorText} error={!!errorText} onChange={(e)=>{
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

    const LabelCheckbox = ({ label, ...props }) => {
        const [field] = useField(props);
        return (<FormControlLabel {...field} labelPlacement="top" control={<Checkbox />} label={label} />);
    };

    return(
        <Grid item xs={12} container spacing={1}>
        <Grid item xs={3}>
            <FormikTextField id="outlined-basic" label="Property name"
                             name={`nProps.${index}.name`} type="input" required fullWidth/>
        </Grid>
        <Grid item xs={3}>
            <ModalSelect setFieldValue={props.setFieldValue} resetDefault={`nProps.${index}.default`} labelId="demo-simple-select-label" name={`nProps.${index}.domain`}/>
        </Grid>
        <Grid item container xs={3} justify={"center"}>
             {
                 switchDefault({dom: property.domain, def:`nProps.${index}.default`, defVal: property.default,
                     selectedDate: selectedDate, handleDateChange:handleDateChange,
                     handleSliderChange: handleSliderChange})
             }
        </Grid>
        <Grid item xs={1}>
            <LabelCheckbox type="checkbox" name={`nProps.${index}.required`} as={Checkbox} label="Required"/>
        </Grid>
        <Grid item xs={1}>
            <LabelCheckbox type="checkbox" name={`nProps.${index}.pk`} as={Checkbox} label="Key"/>
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



const switchDefault = ({dom, def, defVal, selectedDate, handleDateChange, handleSliderChange}) => {

    switch (dom) {
        case "int":
            return <FormikTextField label="Default value" name={def} type="number" defaultValue="Default Value" fullWidth/>;
        case "float":
            return <FormikTextField label="Default value" name={def} type="number" fullWidth/>;
        case "string":
            return <FormikTextField label="Default value" name={def} type="text" fullWidth/>;
        case "bool":
            const defaultValue = defVal !== "" ? defVal : 0;

            return(<Box width="70%">
                <Slider track={false} defaultValue={defaultValue} onChange={(e,v)=>{handleSliderChange(v)}} marks={[
                {value: -1, label: 'False',},
                {value: 0, label: 'No value',},
                {value: 1, label: 'True',}
            ]} aria-labelledby="discrete-slider-small-steps" step={1} min={-1} max={1}/>
            </Box>);
        case "time":
            if (defVal !== "")
                selectedDate=defVal;
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
            if (defVal !== "")
                selectedDate=defVal;
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
            if (defVal !== "")
                selectedDate=defVal;
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
            return <FormikTextField label="Default value" name={def} type="text" disabled fullWidth/>;
    }

};
