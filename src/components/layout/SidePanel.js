import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import BackupIcon from '@material-ui/icons/Backup';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import AddBoxIcon from '@material-ui/icons/AddBox';

import {LoadButton, SaveButton} from '../buttons';

export const drawerWidth = 200;

const useStyles = makeStyles((theme) => ({
  listButton: {
    [theme.breakpoints.up('sm')]: {
      margin: 6,
    },

  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  }
}));


export default function SidePanel(props) {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <div>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: props.isDrawerOpen,
          [classes.drawerClose]: !props.isDrawerOpen,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: props.isDrawerOpen,
            [classes.drawerClose]: !props.isDrawerOpen,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={props.closeDrawer}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <List className={classes.listButton}>
          <ListItem button key="New" onClick={() => console.log('clicked aoooo')}>
            <ListItemIcon ><AddBoxIcon /></ListItemIcon>
            <ListItemText primary="New Grabit" />
          </ListItem>
          <LoadButton/>
          <SaveButton/>
          <ListItem button key="Save">
            <ListItemIcon><SaveIcon /></ListItemIcon>
            <ListItemText primary="Save Grabit" />
          </ListItem>
          <ListItem button key="Delete">
            <ListItemIcon><DeleteIcon /></ListItemIcon>
            <ListItemText primary="Delete Grabit" />
          </ListItem>

        </List>
        {/* <Divider />
        <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List> */}
      </Drawer>

    </div>
  );
}
