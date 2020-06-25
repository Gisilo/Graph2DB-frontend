import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {
    Card,
    CardHeader, CardContent, CardActions,
    Button, Typography, IconButton
} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {EDITOR_URL} from "../../../../common/costants/urls";
import {withRouter} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    title: {
        fontSize: 14,
    },
    pos: {
    marginBottom: 12,
  },
    card: {
        margin: 8,
        paddingLeft: 16,
        paddingRight: 16,
        transition: '0.2s',
        '&:hover': {
            transform: 'scale(1.1)',
            boxShadow: "0 6px 12px 0 rgba(15, 15, 15, .2)",
        },
        width: "90%",
        [theme.breakpoints.up('sm')]: {
            width: '70%',
        },
        [theme.breakpoints.up('md')]: {
            width: '60%',
        },
    }
}));

function GrabitCard(props) {
    const classes = useStyles();
    const {grabitID, grabitName, description, updateDate, history} = props;

    return (
        <Card variant="elevation" elevation={2} className={classes.card}>
            <CardContent>
                <Typography className={classes.title} variant="body2" color="textSecondary">
                    Updated: {updateDate}
                </Typography>
                <Typography variant="h5" component="h2">
                    {grabitName}
                </Typography>
                <Typography className={classes.pos} variant="body2" component="p">
                    {description ? description : "No description"}
                </Typography>
            </CardContent>
            <CardActions>
                <IconButton aria-label="settings">
                    <MoreVertIcon/>
                </IconButton>
                <Button onClick={() => history.push({pathname: EDITOR_URL, grabitID: grabitID})}
                        size="small">
                    Open Grabit
                </Button>
            </CardActions>
        </Card>
    );
}

export default withRouter(GrabitCard);