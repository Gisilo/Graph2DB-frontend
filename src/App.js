import React from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import MainPage from './logged_in/components/layout/MainPage';
import Login from "./logged_out/Login";
import SignUp from "./logged_out/SignUp";
import PrivateRoute from "./shared/components/PrivateRoute";
import {LOG_IN_LINK, ROOT_LINK, SIGN_UP_LINK} from "./shared/costants/links";

function NotFound() {
    return<h1>404 Not Found</h1>; // TODO: temporary component, do a proper 404 page
}

function App() {
    return (
        <Router>
            <Switch>
                <Route path={ROOT_LINK} exact component={MainPage}/>
                <Route path={LOG_IN_LINK} component={Login}/>
                <Route path={SIGN_UP_LINK} component={SignUp}/>
                <PrivateRoute path="/ad" component={MainPage}/>
                <Route component={NotFound}/>
            </Switch>
        </Router>
    );
}


export default App;
