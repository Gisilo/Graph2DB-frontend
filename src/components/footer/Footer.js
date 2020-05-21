import React from "react";
import { Grid, Box, Typography, Divider, List, ListItem, ListItemText } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  top: {
    backgroundColor: theme.palette.primary.main,
  },
  bottom: {
    backgroundColor: theme.palette.secondary.main,
  },
}));

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

const Footer = () => {
  const classes = useStyles();
  return (
    <Box boxShadow={3} >
      <Grid container>
        <Grid item container direction="row" justify="space-evenly" className={classes.top}>
          <Grid item>
            <Typography variant="h6">GISILO</Typography>
            <Divider />

            <p>Slogan o qualcos'altro</p>
          </Grid>
          <Grid item>
            <Typography variant="h6">CONNECT</Typography>

            <Divider />
            <List component="nav" aria-label="secondary mailbox folders">

              <ListItemLink href="#todo">
                <ListItemText primary="Meet the Team" />
              </ListItemLink>

              <ListItemLink href="#todo">
                <ListItemText primary="Contact Us" />
              </ListItemLink>
              <ListItemLink href="#todo">
                <ListItemText primary="Riga icone" />
              </ListItemLink>
            </List>
          </Grid>
        </Grid>

        <Grid item container justify="center" alignItems="flex-start" className={classes.bottom}>
          <Grid item>
            <div className="footer-copyright text-center py-3">
              &copy; {new Date().getFullYear()} Copyright: <a href="https://www.gisilo.com"> Gisilo</a>
            </div>
          </Grid>

        </Grid>
      </Grid>
    </Box>
  );
}

export default Footer;