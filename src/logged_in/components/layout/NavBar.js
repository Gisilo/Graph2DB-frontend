import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MoreIcon from '@material-ui/icons/MoreVert';
import {ExitToApp} from "@material-ui/icons";
import DashboardIcon from '@material-ui/icons/Dashboard';
import SettingsApplicationsOutlinedIcon from '@material-ui/icons/SettingsApplicationsOutlined';
import FeedbackOutlinedIcon from '@material-ui/icons/FeedbackOutlined';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import GrainIcon from '@material-ui/icons/Grain';
import {withRouter} from "react-router-dom";
import {ROOT_URL} from "../../../shared/costants/urls";

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
    [theme.breakpoints.up('sm')]: {
      textAlign: 'center',
    },
  },
  grow: {
    flexGrow: 1,
  },
  singleIcon: {
    marginLeft: 1,
    marginRight: 1,
  },
  leftSection: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    width: '100%',
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
      display: 'flex',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      marginRight: theme.spacing(1),
      width: 'auto',
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
}));

function NavBar(props) {
  const classes = useStyles();
  const {history} = props;
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const menuId = 'primary-search-account-menu-desktop';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={() => console.log("click settings")}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <SettingsApplicationsOutlinedIcon />
        </IconButton>
        <p>My Account</p>
      </MenuItem>
      <MenuItem onClick={() => console.log("click feedback")}>
      <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
      >
        <FeedbackOutlinedIcon />
      </IconButton>
        <p>Feedback</p>
      </MenuItem>
        <MenuItem onClick={() => console.log("click logout")}>
      <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
      >
        <ExitToApp />
      </IconButton>
          <p>Log Out</p>
        </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="fixed">
        <Toolbar variant="dense">
          <div className={classes.leftSection}>
            <IconButton
                className={classes.singleIcon}
                edge="start"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={() => history.push(ROOT_URL)}
                color="inherit"
            >
              <DashboardIcon />
            </IconButton>
            <IconButton
                className={classes.singleIcon}
                edge="start"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={() => console.log("clicked grain")}
                color="inherit"
            >
              <GrainIcon />
            </IconButton>
            <IconButton
                className={classes.singleIcon}
                edge="start"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={() => console.log("clicked convert to schema")}
                color="inherit"
            >
              <SaveAltIcon />
            </IconButton>
          </div>
          <Typography variant="h6" className={classes.title} noWrap>Grask</Typography>
          {/*<div className={classes.grow} />*/}
          <div className={classes.sectionDesktop}>
            <IconButton
                className={classes.singleIcon}
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={() => console.log("clicked settings")}
                color="inherit"
            >
              <SettingsApplicationsOutlinedIcon />
            </IconButton>
            <IconButton
                className={classes.singleIcon}
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={() => console.log("clicked feedback")}
                color="inherit"
            >
              <FeedbackOutlinedIcon />
            </IconButton>
            <IconButton
                className={classes.singleIcon}
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={() => console.log("clicked log out")}
                color="inherit"
            >
              <ExitToApp />
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <div>
              <IconButton
                  className={classes.singleIcon}
                  edge="start"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={() => console.log("clicked dashboard")}
                  color="inherit"
              >
                <DashboardIcon />
              </IconButton>
              <IconButton
                  className={classes.singleIcon}
                  edge="start"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={() => console.log("clicked grain")}
                  color="inherit"
              >
                <GrainIcon />
              </IconButton>
              <IconButton
                  className={classes.singleIcon}
                  edge="start"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={() => console.log("clicked convert to schema")}
                  color="inherit"
              >
                <SaveAltIcon />
              </IconButton>
            </div>

            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      <Toolbar variant="dense"/>
    </div>
  );
}

export default withRouter(NavBar);
