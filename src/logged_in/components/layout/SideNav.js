import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import IconButton from "@material-ui/core/IconButton";
import DashboardIcon from '@material-ui/icons/Dashboard';

export const drawerWidth = 48;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        overflowX: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    toolbar: {
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    },
}));

export default function MiniDrawer() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Drawer variant="permanent" className={classes.drawer}>
                <div className={classes.toolbar}/>
                <Divider />
                <IconButton>
                    <DashboardIcon/>
                </IconButton>
                <Divider />
                {/*<SettingsIcon />*/}
            </Drawer>
        </div>
    );
}
