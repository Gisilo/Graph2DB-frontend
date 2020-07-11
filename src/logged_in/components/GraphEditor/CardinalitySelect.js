import {ErrorMessage, useField} from "formik";
import {FormControl, InputLabel, MenuItem, Select} from "@material-ui/core";
import React from "react";


export const CardinalitySelect = ({ ...props }) => {

    const [field, meta] = useField(props);
    const errorText = meta.error && meta.touched ? meta.error : "";
    return(<FormControl fullWidth>
        <InputLabel>Select {props.type} cardinality</InputLabel>
        <Select required {...field} type="select" helperText={errorText} error={!!errorText}>
            <MenuItem value="zero">Zero</MenuItem>
            <MenuItem value="one">One</MenuItem>
            <MenuItem value="many">Many</MenuItem>
        </Select>
        <ErrorMessage component="p" name={props.name}
                      className="MuiFormHelperText-root MuiFormHelperText-contained Mui-error"/>
    </FormControl>)
};
