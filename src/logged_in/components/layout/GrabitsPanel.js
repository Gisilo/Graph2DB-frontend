import React from 'react';
import { Grid, LinearProgress } from '@material-ui/core';
import GrabitCard from '../GrabitCard';
import { useQuery } from '@apollo/react-hooks';
import { makeStyles } from '@material-ui/core/styles';

import { GET_ALL_GRABITS_QUERY } from '../../../shared/costants/queries'
import NewGrabitCard from "../NewGrabitCard";

const useStyles = makeStyles({
    root: {
        paddingTop: "20px",
        paddingLeft: "20px",
        paddingRight: "20px",
    },
});

export function GrabitsPanel(props) {
    const classes = useStyles();

    const { loading, error, data } = useQuery(GET_ALL_GRABITS_QUERY);

    if (loading) return <LinearProgress color="secondary" />
    if (error) return `Error! ${error.message}`;

    return (
        <Grid container spacing={2} className={classes.root} justify="center">
            <Grid item xs={12} sm={6} md={3}>
                <NewGrabitCard
                    createTab={props.createTab}
                />
            </Grid>
            {
                data.allGrabits.edges.map(
                    (item, i) => {
                        const node = item.node;
                        return (
                            <Grid key={node.id} item xs={12} sm={6} md={3}>
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
    );
}
