import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Card,
    CardHeader, CardContent, Button
} from '@material-ui/core';
import {Form, Formik, useField} from "formik";
import TextField from "@material-ui/core/TextField";
import {useMutation} from "@apollo/react-hooks";
import {CREATE_QUERY} from "../costants/queries";

const useStyles = makeStyles({
        card: {
            maxWidth: 345,
            top: '50%',
            left: '50%',
            borderRadius: 10,
            backgroundSize: '200%',
            boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
            transition: '0.6s',
            // backgroundImage: 'linear-gradient(45deg, #FFC312, #EE5A24, #00a8ff)',
            // '&:hover': {
            //     backgroundPosition: 'right'
            // },
            height: "100%",
        },
    }
);

const MyTextField = ({ ...props }) => {
    const [field, meta] = useField(props);
    const errorText = meta.error && meta.touched ? meta.error : "";
    return <TextField {...field} type={props.type} label={props.label}
                      multiline={props.multiline} rows={props.rows} rowsMax={props.rowsMax}
                      helperText={errorText} disabled={props.disabled}
                      error={!!errorText} fullWidth/>;
};


export default function NewGrabitCard() {
    const classes = useStyles();
    const [addGrabit] = useMutation(CREATE_QUERY);

    return (
        <Card variant="outlined" className={classes.card}>
            <CardHeader
                title="New Grabit"
            />
            <CardContent>
                <Formik
                    initialValues={{ grabitName: "", description: "" }}
                    validate={values => {
                        const errors = {};
                        if (!values.grabitName) {
                            errors.grabitName = 'Required';
                        }
                        return errors;
                    }}
                    onSubmit={(data, { setSubmitting }) => {
                        setSubmitting(true);
                        console.log("submit: ", data);
                        // GRAPHQL REQUEST
                        addGrabit({
                            variables: {
                                nameGrabit: data.grabitName,
                                descr: data.description
                            }
                        }).then((success) => {
                            console.log('success', success);
                        }, (error) => console.log('error', error));
                        setSubmitting(false);
                    }}>
                    {({isSubmitting}) => (
                        <Form>
                            <MyTextField type="text" label="Grabit Name" name="grabitName"/>
                            <MyTextField type="text" label="Description (Optional)" name="description"
                                         multiline={true} rows={2} rowsMax={4}/>

                            <Button disabled={isSubmitting} type="submit" variant="primary">Create</Button>
                        </Form>
                    )}
                </Formik>
            </CardContent>
        </Card>
    );
}
