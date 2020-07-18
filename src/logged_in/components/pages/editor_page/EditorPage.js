import React from 'react';
import GraphEditor from '../../GraphEditor/GraphEditor';
import Grid from "@material-ui/core/Grid";
import NavBar from "../../navbar/NavBar";
import Fab from "@material-ui/core/Fab";
import {makeStyles} from "@material-ui/core/styles";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import {authenticationService} from "../../../../common/services/authenticationService";
import {useQuery} from "@apollo/react-hooks";
import {GET_GRABITS_BY_ID_AND_OWNER} from "../../../../common/costants/queries";
import {LinearProgress} from "@material-ui/core";
const JSON5 = require('json5');


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

export const EditorPage = (props) => {
    const classes = useStyles();
    console.log("ID", props.history.location.grabitID);
    console.log("UTENTE", authenticationService.currentUserValue.pk);
    const id = props.history.location.grabitID;
    const owner = authenticationService.currentUserValue.pk;

    const heightOffset = 50; // magic numbeeeeer

    const { loading, error, data } = useQuery(GET_GRABITS_BY_ID_AND_OWNER,
        {variables: { id:id, owner:owner }
    });

    if (loading) return <LinearProgress color="secondary" />;
    if (error) return `Error! ${error.message}`;

    let graph = [];
    if (data.getGrabitsByIdAndOwner[0].graph !== ""){
        graph = JSON.parse(data.getGrabitsByIdAndOwner[0].graph);
    }

    return (

        <>
            <Grid container>
                <Grid item xs={12}>
                    <NavBar/>
                </Grid>
                <Grid item xs={12}>
                    <GraphEditor heightOffset={heightOffset} graph={graph}/>
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

