import React from 'react';

import { EditorScreen } from "./screens/EditorScreen";
import { LandingPage } from "./screens/LandingPage";
import NavBar from "./navbar/NavBar";
import Footer from "./footer/Footer";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import { Grid } from '@material-ui/core';


function App() {
    return (
        <Router>
            <Grid container>
                <Grid item xs={12}>
                    <NavBar />
                </Grid>
                <Grid item xs={12}>
                    <Switch>
                        <Route path="/editor">
                            <LandingPage />
                        </Route>
                        <Route path="/">
                            <EditorScreen />
                        </Route>
                    </Switch>
                </Grid>
                <Grid item xs={12}>
                    <div><Footer /></div>
                </Grid>

            </Grid>

        </Router>
    );
}

export default App;