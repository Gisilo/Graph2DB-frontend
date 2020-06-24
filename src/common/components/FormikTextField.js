import React from 'react';
import {useField} from 'formik';
import {TextField} from "@material-ui/core";

const FormikTextField = (props) => {
    const [field, meta] = useField(props);
    const errorText = meta.error && meta.touched ? meta.error : "";
    return <TextField {...field} {...props} helperText={errorText} error={!!errorText || props.error}/>;
};

export default FormikTextField;