import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Copyright from "../shared/components/Copyright";
import {Form, Formik} from "formik";
import {useMutation} from "@apollo/react-hooks";
import {SIGNUP_MUT} from "../shared/costants/queries";
import FormikTextField from "../shared/components/FormikTextField";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from '@material-ui/lab/Alert';
import {LOG_IN_URL, MY_GRABITS_URL} from "../shared/costants/urls";
import {Link, withRouter} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

function SignUp(props) {

    const {history} = props;

    const classes = useStyles();
    const [register] = useMutation(SIGNUP_MUT);

    const [open, setOpen] = React.useState(false);
    const [alertMessage, setAlertMessage] = React.useState("Registration successful!");
    const [alertSeverity, setAlertSeverity] = React.useState("success");

    const [usernameError, setUsernameError] = React.useState(false);
    const [emailError, setEmailError] = React.useState(false);
    const [passwordError, setPasswordError] = React.useState(false);

    const openAlert = () => setOpen(true);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') return;
        setOpen(false);
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <Formik
                initialValues={ {username:"", email:"", pass1:"", pass2:""} }
                onSubmit={(data, { setSubmitting }) => {
                    setSubmitting(true);
                    // GraphQL Query to register user (backend does validation)
                    register(
                        {
                            variables: {
                                username: data.username,
                                email:data.email,
                                password1: data.pass1,
                                password2: data.pass2
                            }
                        }).then((response) => {
                            if (response.data.register.success) {
                                setUsernameError(false);
                                setEmailError(false);
                                setPasswordError(false);
                                setAlertSeverity("success");
                                setAlertMessage("Registration successful!");
                                setTimeout(() => history.push(MY_GRABITS_URL), 2000);
                            }
                            else
                            {
                                setAlertSeverity("error");
                                const errors = response.data.register.errors;
                                if (errors.length !== 0){
                                    let error = [];
                                    if (errors.username) {
                                        setUsernameError(true);
                                        setEmailError(false);
                                        setPasswordError(false);
                                        error = errors.username;
                                    } else if(errors.email){
                                        setEmailError(true);
                                        setUsernameError(false);
                                        setPasswordError(false);
                                        error = errors.email;
                                    } else if(errors.password1 || errors.password2){
                                        setPasswordError(true);
                                        setUsernameError(false);
                                        setEmailError(false);
                                        error = errors.password1 || errors.password2;
                                    }
                                    setAlertMessage(error[0].message);
                                }
                                else setAlertMessage("Something went wrong with the registration process :-(");
                            }
                            openAlert();
                    }, (error) => console.error('register error', error));
                    setSubmitting(false);
                }} >
                    {() =>
                        <Form className={classes.form}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <FormikTextField
                                        autoComplete="fname"
                                        name="username"
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="username"
                                        label="Username"
                                        autoFocus
                                        error={usernameError}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormikTextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        autoComplete="email"
                                        error={emailError}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormikTextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        name="pass1"
                                        label="Password"
                                        type="password"
                                        id="pass1"
                                        autoComplete="current-password"
                                        error={passwordError}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormikTextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        name="pass2"
                                        label="Confirm Password"
                                        type="password"
                                        id="pass2"
                                        autoComplete="current-password"
                                        error={passwordError}
                                    />
                                </Grid>
                                {/*<Grid item xs={12}>
                                    <FormControlLabel
                                        control={<Checkbox value="allowExtraEmails" color="primary" />}
                                        label="I want to receive promotions and updates via email."
                                    />
                                </Grid>*/}
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                Sign Up
                            </Button>
                            <Grid container justify="flex-end">
                                <Grid item>
                                    <Link to={LOG_IN_URL} variant="body2">
                                        Already have an account? Log in
                                    </Link>
                                </Grid>
                            </Grid>
                        </Form>
                    }
                </Formik>
            </div>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <MuiAlert onClose={handleClose} severity={alertSeverity} elevation={6} variant="filled" >
                    {alertMessage}
                </MuiAlert>
            </Snackbar>
            <Box mt={5}>
                <Copyright />
            </Box>
        </Container>
    );
}
export default withRouter(SignUp);