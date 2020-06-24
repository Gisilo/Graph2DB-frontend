import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  CardHeader, CardContent, CardActions,
  Button, Typography, IconButton
} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {EDITOR_URL} from "../../common/costants/urls";
import {withRouter} from "react-router-dom";

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

function GrabitCard(props) {
  const classes = useStyles();
  const { grabitID, grabitName, description, updateDate, history } = props;

  return (
    <Card variant="outlined" className={classes.card}>
      <CardHeader
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={grabitName}
          subheader={`Last updated: ${updateDate}`}
      />
      <CardContent>
        <Typography variant="body2" component="p">
          {description ? description : "No description"}
        </Typography>
      </CardContent>
      <CardActions>
        <Button onClick={() => history.push({pathname: EDITOR_URL, grabitID: grabitID})} size="small">Open Grabit</Button>
      </CardActions>
    </Card>
  );
}

export default withRouter(GrabitCard);