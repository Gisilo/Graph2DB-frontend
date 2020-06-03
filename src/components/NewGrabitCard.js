import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Card,
    CardHeader, CardContent, CardActions,
    Button, Typography, IconButton
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles({
        card: {
            maxWidth: 345,
            top: '50%',
            left: '50%',
            borderRadius: 10,
            backgroundSize: '200%',
            boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
            transition: '0.6s',
            backgroundImage: 'linear-gradient(45deg, #FFC312, #EE5A24, #00a8ff)',
            '&:hover': {
                backgroundPosition: 'right'
            },
            height: "100%",
        },
    addbutton: {
        paddingTop: "20px",
        paddingBottom: "20px",
        paddingLeft: "40px",
        paddingRight: "40px",
    }
    }
);

export default function NewGrabitCard(props) {
    const classes = useStyles();

    return (
        <Card variant="outlined" className={classes.card}>
            <CardHeader
                title="New Grabit"
            />
            <CardContent>
                <Grid container justify="center">
                    <Grid item>
                        <Button className={classes.addbutton} variant="outlined" aria-label="add">
                            <AddIcon />
                        </Button>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
}
