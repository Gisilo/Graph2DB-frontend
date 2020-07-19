import React, {useState} from 'react';
import GraphEditor from '../../GraphEditor/GraphEditor';
import Grid from "@material-ui/core/Grid";
import NavBar from "../../navbar/NavBar";
import Fab from "@material-ui/core/Fab";
import {makeStyles} from "@material-ui/core/styles";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import {authenticationService} from "../../../../common/services/authenticationService";
import {GET_GRABITS_BY_ID_AND_OWNER, CREATE_MUT} from "../../../../common/costants/queries";
import {withApollo} from "@apollo/react-hoc";
import LinearProgress from "@material-ui/core/LinearProgress";


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

const EditorPage = (props) => {
    const heightOffset = 50; // magic numbeeeeer

    const classes = useStyles();
    const owner = authenticationService.currentUserValue.pk;
    const [idGrabit, setIdGrabit] = useState(props.history.location.grabitID);
    const [skip, setSkip] = useState(false);
    const [graph, setGraph] = useState([]);

    const query = () => queryGrabit(idGrabit, setIdGrabit, setGraph, owner, props.client);
    const mutate = () => mutateGrabit(setIdGrabit, owner, props.client);

    loadOrCreate(query, mutate, idGrabit, skip, setSkip);

    if (!idGrabit){
        return <LinearProgress color="secondary" />;
    }

    return (
        <>
            <Grid container>
                <Grid item xs={12}>
                    <NavBar/>
                </Grid>
                <Grid item xs={12}>
                    <GraphEditor heightOffset={heightOffset} graph={graph} idGrabit={idGrabit}/>
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
};

const loadOrCreate = (query, mutate, idGrabit, skip, setSkip) => {

    if (skip) return;

    if (!idGrabit) {
        mutate();
    } else {
        query();
    }
    setSkip(true);

};

const queryGrabit = (idGrabit, setIdGrabit, setGraph, owner, client) => {
    client.query({
        query: GET_GRABITS_BY_ID_AND_OWNER,
        variables: {id: idGrabit, owner: owner}
    }).then(
        (response) => {
            setIdGrabit(response.data.getGrabitsByIdAndOwner[0].id);
            const graph = response.data.getGrabitsByIdAndOwner[0].graph;
            if (graph !== "") {
                setGraph(JSON.parse(graph));
            }
        },
        (err) => {
            console.log("err", err);
        }
    );
};

const mutateGrabit = (setIdGrabit, owner, client) => {
    client.mutate({
        mutation: CREATE_MUT,
        variables: {
            nameGrabit: "Untitled", owner: owner,
        },
    })
        .then(
            (response) => {
                console.log("response", response);
                setIdGrabit(response.data.createGrabit.grabit.id);
            },
            (err) => {
                console.log("err", err);
            }
        );
};

export default withApollo(EditorPage);

