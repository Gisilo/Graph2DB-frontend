
import {ErrorMessage, FieldArray, Form, Formik} from "formik";
import React from "react";
import PropTypes from 'prop-types';
import FormikTextField from '../../../shared/inputs/FormikTextField'
import { Button, Grid, Slide, DialogContent, DialogTitle, Dialog} from '@material-ui/core'

import * as yup from 'yup'
import PropertyAdder from "./PropertyAdder";

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
                console.log(value);
                return Number.isInteger(value);
            } else {
                return true
            }
        },
    });
});

yup.addMethod(yup.array, "unique", function(message, mapper) {
    return this.test("unique", message, function(list) {
        //const mapper = x => get(x, path);
        const set = [...new Set(list.map(mapper))];
        const isUnique = list.length === set.length;
        if (isUnique) {
            return true;
        }

        const idx = list.findIndex((l, i) => mapper(l) !== set[i]);
        console.log(idx, `[${idx}].name`);
        return this.createError({ path: `nProps[${idx}].name`, message });
    });
});

const schema = yup.object({
    nName: yup.string().required("Node name required"),
    nDesc: yup.string(),
    nProps: yup.array().of(
        yup.object({
            name: yup.string().required("Name required"),
            domain: yup.mixed().oneOf(['int', 'float', 'string', 'bool', 'date', 'time', 'dateTime'])
                .required("Domain required"),
            pk: yup.boolean(),
            required: yup.boolean(),
            default: yup.mixed()
                .checkWithField('domain', 'Default value must be integer')
                .when('required', {is: true, then:yup.mixed().required("Default value required")})
        })
    ).unique("Name property just used", x => x.name)

});

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export function NodeModal(props) {
    const { onClose, open } = props;

    const handleClose = () => {
        onClose();
    };

    return (
        <Dialog fullWidth maxWidth={'md'} onClose={handleClose} aria-labelledby="simple-dialog-title" open={open} TransitionComponent={Transition}>
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
                    {({ values, isSubmitting, setFieldValue, errors }) => (
                        <Form>
                            <Grid container>
                                <Grid item container spacing={2}>
                                    <Grid item xs={12}>
                                        <FormikTextField id="outlined-basic" label="Node Name" name="nName" type="input" variant="outlined" fullWidth/>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormikTextField multiline rows={2} rowsMax={4} id="ig1" variant="outlined"
                                                         label="Node Description" name="nDesc" type="input" fullWidth/>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <FieldArray name="nProps">

                                            {arrayHelpers => (
                                                <>
                                                    <Button
                                                        onClick={() =>{
                                                            const newProp = {
                                                                name: "",
                                                                domain: "",
                                                                default: "",
                                                                required: false,
                                                                pk: false
                                                            };
                                                            arrayHelpers.push(newProp);
                                                        }}
                                                    >
                                                        Add props
                                                    </Button>
                                                    <Grid container spacing={1}>
                                                        {values.nProps.map((pro, index) => {
                                                            return(
                                                                <Grid container item key={pro.id}>
                                                                    <PropertyAdder setFieldValue={setFieldValue} property={pro}
                                                                                   index={index} deleteProp={()=> {
                                                                        arrayHelpers.remove(index);
                                                                    }}/>
                                                                </Grid>
                                                            )
                                                        })}
                                                    </Grid>

                                                </>
                                                        )}
                                        </FieldArray>
                                    </Grid>

                                    <Grid item xs={12} container justify="right">
                                        {props.typeModal === 'create'&&
                                            <>
                                        <Button disabled={isSubmitting} type="submit" variant="primary">Create</Button>
                                        {typeof errors.nProps === 'string' ? (
                                            <div>{errors.nProps}</div>
                                            ) : null}
                                        </>}
                                        <pre>{JSON.stringify(errors, null, 2)}</pre>
                                        {props.typeModal === 'edit'&& <Button disabled={isSubmitting} type="submit" variant="primary">Save</Button>}
                                    </Grid>

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
