import React from 'react';
import {useField} from 'formik';
import {TextField} from "@material-ui/core";

const MyTextField = ({ ...props }) => {
    const [field, meta] = useField(props);
    const errorText = meta.error && meta.touched ? meta.error : "";
    return <TextField {...field} type={props.type} label={props.label} variant={props.variant}
                      multiline={props.multiline} rows={props.rows} rowsMax={props.rowsMax}
                      helperText={errorText} disabled={props.disabled}
                      error={!!errorText} fullWidth/>;
};

export default MyTextField;
