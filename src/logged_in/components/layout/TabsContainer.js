import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {EditorPage} from '../pages/EditorPage';
import {GrabitsPanel} from '../pages/grabits_page/GrabitsPanel';

function TabPanel(props) {
    const { children, value, index, createTab, grabitID, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-auto-tabpanel-${index}`}
            aria-labelledby={`scrollable-auto-tab-${index}`}
            {...other}
        >
            {value === index && (
                value===0 ? <GrabitsPanel createTab={createTab}/> : <EditorPage/>
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
    tabcontainer: {
        width: '100%',
    }
}));

export default function TabsContainer() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const [tabs, setTabs] = React.useState([]);

    function createTab(data){
        const ids = tabs.map(t => t.id);
        if (ids.length !== 0){
            setValue(ids.indexOf(data.id)+1);
        }
        else {
            setTabs(tabs => tabs.concat( data ) );
            setValue(tabs.length+1);
        }
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
                >
                    <Tab label="Grabits" {...a11yProps(0)} />
                    { tabs.map((e, i) =>
                        <Tab key={i} label={e.name} {...a11yProps(i+1)} />
                        // +1 cause index 0 is for GrabitPanel
                        )
                    }
                </Tabs>
            <TabPanel createTab={createTab} value={value} index={0}/>
            { tabs.map((e,i) => <TabPanel grabitID={e.id} key={i} value={value} index={i+1}/>) }

        </div>
    );
}