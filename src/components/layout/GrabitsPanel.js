import React from 'react';
import { Grid, LinearProgress } from '@material-ui/core';
import GrabitCard from '../GrabitCard';
import { useQuery } from '@apollo/react-hooks';

import { GET_ALL_GRABITS } from '../../costants/queries'

export function GrabitsPanel(props) {

    const { loading, error, data } = useQuery(GET_ALL_GRABITS);

    if (loading) return <LinearProgress color="secondary" />
    if (error) return `Error! ${error.message}`;

    return (
        <Grid container>
            {
                data.allGrabits.edges.map(
                    (item, i) => {
                        const node = item.node;
                        console.log(node);
                        return (
                            <Grid key={node.id} item>
                                <GrabitCard 
                                grabitName={node.nameProject}
                                description={node.description} />
                            </Grid>
                        );
                    })
            }
        </Grid>

    );

}
