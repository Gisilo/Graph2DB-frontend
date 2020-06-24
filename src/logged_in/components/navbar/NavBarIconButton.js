import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles(() => ({
    singleIcon: {
        marginLeft: 1,
        marginRight: 1,
    },
}));

function NavBarIconButton(props) {
    const classes = useStyles();
    const {icon, onClick, aria_label, menuId} = props;

    return (
        <IconButton
            className={classes.singleIcon}
            aria-label={aria_label}
            aria-controls={menuId}
            onClick={onClick}
            color="inherit"
        >
            {icon}
        </IconButton>

    );
}

export default NavBarIconButton;
