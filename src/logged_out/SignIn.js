import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import {Form, Formik} from "formik";
import FormikTextField from "../shared/inputs/FormikTextField";
import {useMutation} from "@apollo/react-hooks";
import {makeStyles} from "@material-ui/core/styles";
import Copyright from "../shared/Copyright";
import {SIGN_UP_LINK} from "../shared/costants/links";
import {Link} from "react-router-dom";
import {SIGNIN_MUT} from "../shared/costants/queries";
import MuiAlert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";

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
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function SignIn(){

    const classes = useStyles();
    const [signIn] = useMutation(SIGNIN_MUT);

    const [open, setOpen] = React.useState(false);
    const [alertMessage, setAlertMessage] = React.useState("Registration successful!");
    const [alertSeverity, setAlertSeverity] = React.useState("success");

    const [credentialsError, setCredentialsError] = React.useState(false);

    const openAlert = () => setOpen(true);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') return;
        setOpen(false);
    };

    return (
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Formik
                        initialValues={{ username: "", password: ""}}
                        onSubmit={(data, { setSubmitting }) => {
                            setSubmitting(true);
                            console.log("submit: ", data);
                            // GraphQL Query to get user token
                            signIn(
                                {
                                    variables: {
                                        username: data.username,
                                        password: data.password
                                    }
                                }).then(
                                    (response) => {
                                        if (response.data.tokenAuth.success) {
                                            setCredentialsError(false);
                                            setAlertSeverity("success");
                                            setAlertMessage("Sign in successful!");
                                        }
                                        else {
                                            setAlertSeverity("error");
                                            setCredentialsError(true);
                                            const errors = response.data.tokenAuth.errors.nonFieldErrors;
                                            if (errors) setAlertMessage(errors[0].message);
                                            else setAlertMessage("Something went wrong with the registration process :-(");
                                        }
                                        openAlert();
                                    },
                                (error) => console.error('sign in error', error)
                            );
                            //localStorage.setItem(AUTH_TOKEN, token)
                            setSubmitting(false);
                        }}>
                        {() => (
                            <Form className={classes.form}>
                                <FormikTextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="username"
                                    label="Username"
                                    name="username"
                                    autoFocus
                                    error={credentialsError}
                                />
                                <FormikTextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    error={credentialsError}
                                />
                                <FormControlLabel
                                    control={<Checkbox value="remember" color="primary"/>}
                                    label="Remember me"
                                />
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}
                                >
                                    Sign In
                                </Button>
                                <Grid container>
                                    <Grid item xs>
                                        <Link to="#" variant="body2">
                                            Forgot password?
                                        </Link>
                                    </Grid>
                                    <Grid item>
                                        <Link to={SIGN_UP_LINK} variant="body2">
                                            {"Don't have an account? Sign Up"}
                                        </Link>
                                    </Grid>
                                </Grid>
                            </Form>
                        )}
                    </Formik>
                </div>
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                    <MuiAlert onClose={handleClose} severity={alertSeverity} elevation={6} variant="filled" >
                        {alertMessage}
                    </MuiAlert>
                </Snackbar>
                <Box mt={8}>
                    <Copyright/>
                </Box>
            </Container>
        );
}