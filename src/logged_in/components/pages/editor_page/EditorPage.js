import React from 'react';
import {GraphEditor} from '../../GraphEditor/GraphEditor';
import Grid from "@material-ui/core/Grid";
import NavBar from "../../navbar/NavBar";
import Fab from "@material-ui/core/Fab";
import {makeStyles} from "@material-ui/core/styles";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';


const useStyles = makeStyles( (theme) => ({
    fab: {
        top: 'auto',
        right: 30,
        bottom: 30,
        left: 'auto',
        position: 'fixed',
    },
    extendedIcon: {
        marginRight: theme.spacing(1),
    },
}));

export const EditorPage = () => {
    const classes = useStyles();

    const heightOffset = 50; // magic numbeeeeer
    return (
        <>
            <Grid container>
                <Grid item xs={12}>
                    <NavBar/>
                </Grid>
                <Grid item xs={12}>
                    <GraphEditor heightOffset={heightOffset}/>
                </Grid>
            </Grid>
            <Fab
                variant="extended"
                size="medium"
                color="primary"
                aria-label="add node"
                className={classes.fab}
            >
                <AddCircleOutlineIcon className={classes.extendedIcon}/>
                Add Node
            </Fab>
        </>
    );
}

