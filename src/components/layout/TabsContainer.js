import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {EditorScreen} from '../screens/EditorScreen';
import {GrabitsPanel} from './GrabitsPanel';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-auto-tabpanel-${index}`}
            aria-labelledby={`scrollable-auto-tab-${index}`}
            {...other}
        >
            {value === index && (
                value===0 ? <GrabitsPanel createTab={props.cb}/> : <EditorScreen/>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `scrollable-auto-tab-${index}`,
        'aria-controls': `scrollable-auto-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
}));

export default function TabsContainer() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const [tabs, setTabs] = React.useState([]);

    function createTab(l){
        console.log("Tab created");
        setTabs(tabs => tabs.concat( l ) );
    }

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className={classes.root}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="scrollable"
                    scrollButtons="on"
                    aria-label="scrollable auto tabs example"
                >
                    <Tab label="Grabits" {...a11yProps(0)} />
                    { tabs.map((l, i) =>
                        <Tab key={i} label={l} {...a11yProps(i+1)} />
                        // +1 cause index 0 is for GrabitPanel
                        )
                    }
                </Tabs>
            <TabPanel cb={createTab} value={value} index={0}/>
            { tabs.map((l,i) => <TabPanel key={i} value={value} index={i+1}/>) }

        </div>
    );
}
