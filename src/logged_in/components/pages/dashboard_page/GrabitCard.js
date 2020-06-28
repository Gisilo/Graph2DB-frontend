import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {
    Card, CardContent, CardActions,
    Button, Typography, IconButton
} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {EDITOR_URL, SETTINGS_URL} from "../../../../common/costants/urls";
import {withRouter} from "react-router-dom";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Divider from '@material-ui/core/Divider';
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    card: {
        margin: 16,
        paddingLeft: 16,
        paddingRight: 16,
        transition: '0.2s',
        '&:hover': {
            transform: 'scale(1.1)',
            boxShadow: "0 6px 12px 0 rgba(15, 15, 15, .2)",
        },
        width: "80%",
        [theme.breakpoints.up('sm')]: {
            width: '70%',
            margin: 8,
        },
        [theme.breakpoints.up('md')]: {
            width: '60%',
        },
    }
}));

function GrabitCard(props) {
    const classes = useStyles();
    const {grabitID, grabitName, description, updateDate, history} = props;
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const grabitMenuId = 'grabit-card-more-menu';
    const renderMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{vertical: 'top', horizontal: 'right'}}
            id={grabitMenuId}
            keepMounted
            transformOrigin={{vertical: 'top', horizontal: 'right'}}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem onClick={() => console.log("click delete grabit")}>
                <IconButton
                    aria-label={'edit grabit info'}
                    aria-controls={grabitMenuId}
                    color="inherit"
                >
                    <EditIcon/>
                </IconButton>
                <p>Edit Name/Description</p>
            </MenuItem>
            <Divider/>
            <MenuItem onClick={() => console.log("delete grabit")}>
                <IconButton
                    aria-label={'edit grabit info'}
                    aria-controls={grabitMenuId}
                    color="inherit"
                >
                    <DeleteIcon/>
                </IconButton>
                <p>Delete Grabit</p>
            </MenuItem>
        </Menu>
    );
    return (
        <>
            <Card variant="elevation" elevation={2} className={classes.card}>
                <CardContent>
                    <Grid container direction="row"
                          justify="space-between"
                          alignItems="center">
                        <Grid item xs={6}>
                            <Typography className={classes.title} variant="body2" color="textSecondary">
                                Updated: {updateDate}
                            </Typography>
                        </Grid>
                        <Grid item xs={1}>
                            <IconButton
                                aria-label="show more"
                                aria-controls={grabitMenuId}
                                aria-haspopup="true"
                                onClick={handleMobileMenuOpen}
                                color="inherit">
                                <MoreVertIcon/>
                            </IconButton>
                        </Grid>
                    </Grid>
                    <Typography variant="h5" component="h2">
                        {grabitName}
                    </Typography>
                    <Typography className={classes.pos} variant="body2" component="p">
                        {description ? description : "No description"}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Grid container justify="flex-end">
                    <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => history.push({pathname: EDITOR_URL, grabitID: grabitID})}
                        size="small">
                        Open Grabit
                    </Button>
                    </Grid>
                </CardActions>
            </Card>
            {renderMenu}
        </>
    );
}

export default withRouter(GrabitCard);