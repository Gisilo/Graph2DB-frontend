import React from 'react';

import { EditorScreen } from "./screens/EditorScreen";
import { LandingPage } from "./screens/LandingPage";
import NavBar from "./layout/navbar/NavBar";
import Footer from "./layout/footer/Footer";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import { Grid, TabPanel } from '@material-ui/core';
import Root from './layout/Root';


function App() {
    return (
        <Router>
            <Grid container>
                <Grid item xs={12}>
                    <Switch>
                        <Route path="/">
                            <Root/>
                        </Route>
                        <Route path="/editor">
                            <EditorScreen />
                        </Route>
                    </Switch>
                </Grid>
            </Grid>
        </Router>
    );
}

export default App;