import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Zoom from "@material-ui/core/Zoom";
import {Form, Formik} from "formik";
import FormikTextField from "../../../../common/components/FormikTextField";
import {useMutation} from "@apollo/react-hooks";
import {CREATE_MUT} from "../../../../common/costants/queries";
import {withRouter} from "react-router-dom";
import {EDITOR_URL} from "../../../../common/costants/urls";

// This generates findDomNode warning, TODO: find alternative to forwardRef
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Zoom ref={ref} {...props} />;
});

function ModalGrabitCreation(props) {
    const {open, handleClose, history} = props;
    const [addGrabit] = useMutation(CREATE_MUT);

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
                TransitionComponent={Transition}>
                <DialogTitle id="form-dialog-title">Create new Grabit</DialogTitle>
                <Formik
                    initialValues={{grabitName: "", description: ""}}
                    // validationSchema={yup.object({grabitName: yup.string().required("Grabit name required")})}
                    onSubmit={(data, { setSubmitting }) => {
                        setSubmitting(true);
                        // query to create grabit
                        addGrabit({
                            variables: {
                                nameGrabit: data.grabitName,
                                descr: data.description
                            }
                        }).then((response) => {
                            console.log('success', response);
                            const id = response.data.createGrabit.grabit.id;
                            handleClose();
                            setTimeout(() => history.push({pathname: EDITOR_URL, grabitID: id}), 500);
                        }, (error) => console.error('error', error));
                        setSubmitting(false);
                    }}>
                    {(isSubmitting) =>
                        (<Form>
                        <DialogContent>
                            <DialogContentText>
                                Provide a name and an (optional) description to start working.
                            </DialogContentText>
                            <FormikTextField
                                autoFocus
                                margin="dense"
                                id="name"
                                label="Grabit Name"
                                type="text"
                                name="grabitName"
                                fullWidth
                                required
                            />
                            <FormikTextField
                                margin="dense"
                                id="description"
                                label="Description"
                                type="text"
                                name="description"
                                fullWidth
                                multiline
                                rows={2}
                                maxRows={4}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose} color="primary">
                                Cancel
                            </Button>
                            <Button disabled={!isSubmitting} type="submit" color="primary">
                                Create Grabit
                            </Button>
                        </DialogActions>
                        </Form>)
                    }
                </Formik>
            </Dialog>
        </div>
    );
}

export default withRouter(ModalGrabitCreation);