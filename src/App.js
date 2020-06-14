import React from 'react';

import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import MainPage from './logged_in/components/layout/MainPage';
import SignIn from "./logged_out/SignIn";
import SignUp from "./logged_out/SignUp";
import Pricing from "./logged_out/Pricing";


function App() {
    return (
        <Router>
            <Switch>
                <Route path="/">
                    <SignIn />
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
