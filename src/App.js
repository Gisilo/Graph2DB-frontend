import React from 'react';

import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import MainPage from './logged_in/components/layout/MainPage';
import SignIn from "./logged_out/SignIn";
import SignUp from "./logged_out/SignUp";

function NotFound() {
    return<h1>404 Not Found</h1>; // TODO: temporary component, do a proper 404 page
}

function App() {
    return (
        <Router>
            <Switch>
                <Route path="/" exact component={MainPage}/>
                <Route path="/signin" component={SignIn}/>
                <Route path="/signup" component={SignUp}/>
                <Route component={NotFound}/>
            </Switch>
        </Router>
    );
}

export default App;
