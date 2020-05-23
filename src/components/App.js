import React from 'react';

import { EditorScreen } from "./screens/EditorScreen";
import { LandingPage } from "./screens/LandingPage";
import NavBar from "./layout/NavBar";
import Footer from "./layout/Footer";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import { Grid, TabPanel } from '@material-ui/core';
import MainPage from './layout/MainPage';


function App() {
    return (
        <Router>
            <Switch>
                <Route path="/">
                    <MainPage />
                </Route>
                <Route path="/editor">
                    <EditorScreen />
                </Route>
            </Switch>
        </Router>
    );
}

export default App;