import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tab from '@material-ui/core/Tab';
import TabContext from '@material-ui/lab/TabContext';
import TabList from '@material-ui/lab/TabList';
import TabPanel from '@material-ui/lab/TabPanel';
import {EditorScreen} from "../screens/EditorScreen";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
    content: {
        flexGrow: 1,
        paddingTop: theme.spacing(3),
        paddingLeft: theme.spacing(3),
    },
}));

export default function LabTabs() {
    const classes = useStyles();
    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className={classes.root}>
            <TabContext value={value}>
                <AppBar position="fixed">
                    <TabList onChange={handleChange} aria-label="simple tabs example" variant={"fullWidth"}>
                        <Tab label="Item One" value="1" />
                        <Tab label="Item Two" value="2" />
                        <Tab label="Item Three" value="3" />
                    </TabList>
                </AppBar>
                <main className={classes.content}>
                    <TabPanel value="1">Item One veri lonk item uuuu</TabPanel>
                    <TabPanel value="2"><EditorScreen/></TabPanel>
                    <TabPanel value="3">Item Three</TabPanel>
                </main>
            </TabContext>
        </div>
    );
}
