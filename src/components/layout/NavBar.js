import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { drawerWidth } from './SidePanel';


const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
}));

export default function NavBar(props) {
  const classes = useStyles();

  return (
    <AppBar
    position="fixed"
    className={clsx(classes.appBar, {
      [classes.appBarShift]: props.isDrawerOpen,
    })}
  >
    <Toolbar>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={props.openDrawer}
        edge="start"
        className={clsx(classes.menuButton, {
          [classes.hide]: props.isDrawerOpen,
        })}
      >
        <MenuIcon />
      </IconButton>
      <Typography variant="h6" noWrap>
        Grask
      </Typography>
    </Toolbar>
  </AppBar>
  );
}