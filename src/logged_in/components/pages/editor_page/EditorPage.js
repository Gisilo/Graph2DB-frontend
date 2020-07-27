import React, {useState} from 'react';
import GraphEditor from '../../GraphEditor/GraphEditor';
import Grid from "@material-ui/core/Grid";
import NavBar from "../../navbar/NavBar";
import {makeStyles} from "@material-ui/core/styles";
import {authenticationService} from "../../../../common/services/authenticationService";
import {GET_GRABITS_BY_ID_AND_OWNER, CREATE_MUT} from "../../../../common/costants/queries";
import {withApollo} from "@apollo/react-hoc";
import LinearProgress from "@material-ui/core/LinearProgress";
import {grabitIDState, grabitNamesState} from "../dashboard_page/GrabitsPanel";
import {useRecoilState} from "recoil";


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
    const [idGrabit, setIdGrabit] = useRecoilState(grabitIDState);
    const [skip, setSkip] = useState(false);
    const [graph, setGraph] = useState([]);

    const [grabitNames, setGrabitNames] = useRecoilState(grabitNamesState);
    const query = () => queryGrabit(idGrabit, setIdGrabit, setGraph, owner, props.client);
    const mutate = () => mutateGrabit(setIdGrabit, owner, grabitNames, setGrabitNames, props.client);

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
        </>
    );
};

const getMaxUntitledNumber = (names) => {
    const re = new RegExp("^Untitled(-[0-9]+)?$");

    const listNum = names.filter(name => re.test(name)).map(name => {
        const split = name.split("-")[1];
        if (split === undefined){
            return 0
        }
        else return parseInt(split)
    });
    const max = Math.max(...listNum);
    return max !== -Infinity ? max : -1;
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

const mutateGrabit = (setIdGrabit, owner, grabitsNames, setGrabitNames, client) => {
    const maxUntitled = getMaxUntitledNumber(grabitsNames);
    const name = maxUntitled === -1 ? 'Untitled' : `Untitled-${maxUntitled+1}`;
    client.mutate({
        mutation: CREATE_MUT,
        variables: {
            nameGrabit: name, owner: owner,
        },
    })
        .then(
            (response) => {
                console.log("response", response);
                setIdGrabit(response.data.createGrabit.grabit.id);
                setGrabitNames([response.data.createGrabit.grabit.name, {...grabitsNames}])
            },
            (err) => {
                console.log("err", err);
            }
        );
};

export default withApollo(EditorPage);

