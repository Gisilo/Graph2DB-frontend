import React from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import MainPage from './logged_in/components/pages/MainPage';
import Login from "./logged_out/Login";
import SignUp from "./logged_out/SignUp";
import PrivateRoute from "./common/components/PrivateRoute";
import {EDITOR_URL, LOG_IN_URL, ROOT_URL, SIGN_UP_URL} from "./common/costants/urls";
import {EditorPage} from "./logged_in/components/pages/EditorPage";

function NotFound() {
    return<h1>404 Not Found</h1>; // TODO: temporary component, do a proper 404 page
}

function App() {
    return (
        <Router>
            <Switch>
                <PrivateRoute exact path={ROOT_URL} component={MainPage}/>
                <PrivateRoute path={EDITOR_URL} component={EditorPage}/>
                <Route path={LOG_IN_URL} component={Login}/>
                <Route path={SIGN_UP_URL} component={SignUp}/>
                <Route component={NotFound}/>
            </Switch>
        </Router>
    );
}


export default App;
