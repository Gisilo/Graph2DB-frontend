import React from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import MainPage from './logged_in/components/layout/MainPage';
import Login from "./logged_out/Login";
import SignUp from "./logged_out/SignUp";
import PrivateRoute from "./shared/components/PrivateRoute";
import {EDITOR_URL, LOG_IN_URL, MY_GRABITS_URL, ROOT_URL, SIGN_UP_URL} from "./shared/costants/urls";
import GrabitPage from "./logged_in/components/layout/GrabitsPage";

function NotFound() {
    return<h1>404 Not Found</h1>; // TODO: temporary component, do a proper 404 page
}

function App() {
    return (
        <Router>
            <Switch>
                <PrivateRoute exact path={ROOT_URL} component={MainPage}/>
                <PrivateRoute path={EDITOR_URL} component={MainPage}/>
                <Route path={LOG_IN_URL} component={Login}/>
                <Route path={SIGN_UP_URL} component={SignUp}/>
                <Route component={NotFound}/>
            </Switch>
        </Router>
    );
}


export default App;
