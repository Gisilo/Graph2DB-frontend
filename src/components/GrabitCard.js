import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  CardHeader, CardContent, CardActions,
  Button, Typography, IconButton
} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';

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
  }
}
);

export default function GrabitCard(props) {
  const classes = useStyles();
  const { grabitName, description, updateDate } = props;

  return (
    <Card variant="outlined" className={classes.card}>
      <CardContent>
        <CardHeader
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={grabitName}
          subheader={`Last updated: ${updateDate}`}
        />
        <Typography variant="h5" component="h2">

        </Typography>
        <Typography variant="body2" component="p">
          {description ? description : "No description"}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Open Grabit</Button>
      </CardActions>
    </Card>
  );
}
