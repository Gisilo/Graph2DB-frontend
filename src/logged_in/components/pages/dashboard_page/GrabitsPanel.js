import React from 'react';
import { Grid, LinearProgress } from '@material-ui/core';
import GrabitCard from './GrabitCard';
import { useQuery } from '@apollo/react-hooks';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import { GET_ALL_GRABITS_QUERY } from '../../../../common/costants/queries'
import Fab from "@material-ui/core/Fab";
import CreateGrabitModal from "./CreateGrabitModal";

const useStyles = makeStyles( (theme) => ({
    root: {
        marginTop: 20,
    },
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

export function GrabitsPanel(props) {
    const classes = useStyles();

    // ** State to open and close CreateGrabitModal
    const [openModal, setOpenModal] = React.useState(false);
    const handleClickOpen = () => setOpenModal(true);
    const handleClose = () => setOpenModal(false);
    // **

    const { loading, error, data } = useQuery(GET_ALL_GRABITS_QUERY);

    if (loading) return <LinearProgress color="secondary" />
    if (error) return `Error! ${error.message}`;

    return (
        <>
            <Grid container justify={"center"} className={classes.root}>
                {
                    data.allGrabits.edges.map(
                        (item) => {
                            const node = item.node;
                            return (
                                <Grid item container justify={"center"} key={node.id} xs={12}>
                                    <GrabitCard
                                      grabitID={node.id}
                                        grabitName={node.nameProject}
                                        description={node.description}
                                        updateDate={node.updateDate}
                                        createTab={props.createTab}
                                    />
                                </Grid>
                            );
                        })
                }
            </Grid>
            <Fab
                variant="extended"
                size="medium"
                color="primary"
                aria-label="add grabit"
                className={classes.fab}
                onClick={handleClickOpen}
            >
                <AddIcon className={classes.extendedIcon}/>
                Create Grabit
            </Fab>
            <CreateGrabitModal open={openModal} handleClose={handleClose}/>
        </>
    );
}
