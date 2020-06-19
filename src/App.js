import React from 'react';

import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import MainPage from './logged_in/components/layout/MainPage';
import SignIn from "./logged_out/SignIn";
import SignUp from "./logged_out/SignUp";
import {AuthContext} from "./shared/services/authenticationService";
import PrivateRoute from "./shared/services/PrivateRoute";
import {LOG_IN_LINK, ROOT_LINK, SIGN_UP_LINK} from "./shared/costants/links";

function NotFound() {
    return<h1>404 Not Found</h1>; // TODO: temporary component, do a proper 404 page
}

function App() {
    return (
        <AuthContext.Provider value={true}>
            <Router>
                <Switch>
                    <Route path={ROOT_LINK} exact component={MainPage}/>
                    <Route path={LOG_IN_LINK} component={SignIn}/>
                    <Route path={SIGN_UP_LINK} component={SignUp}/>
                    <PrivateRoute path="/ad" component={MainPage}/>
                    <Route component={NotFound}/>
                </Switch>
            </Router>
        </AuthContext.Provider>
    );
}

export default App;
