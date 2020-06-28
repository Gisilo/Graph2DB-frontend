import React from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import DashboardPage from './logged_in/components/pages/dashboard_page/DashboardPage';
import Login from "./logged_out/Login";
import SignUp from "./logged_out/SignUp";
import PrivateRoute from "./common/components/PrivateRoute";
import {EDITOR_URL, LOG_IN_URL, ROOT_URL, SIGN_UP_URL} from "./common/costants/urls";
import {EditorPage} from "./logged_in/components/pages/editor_page/EditorPage";

import { createMuiTheme } from '@material-ui/core/styles';
import {ThemeProvider} from "@material-ui/styles";

function NotFound() {
    return<h1>404 Not Found</h1>; // TODO: temporary component, do a proper 404 page
}

const palette = {
    primary: { main: '#1B7B34' },
    secondary: { main: '#1fb58f' }
};
const themeName = 'Forest Green Mountain Meadow Grasshopper';

const theme = createMuiTheme({ palette, themeName });

function App() {
    return (
        <ThemeProvider theme={theme}>
        <Router>
            <Switch>
                <PrivateRoute exact path={ROOT_URL} component={DashboardPage}/>
                <PrivateRoute path={EDITOR_URL} component={EditorPage}/>
                <Route path={LOG_IN_URL} component={Login}/>
                <Route path={SIGN_UP_URL} component={SignUp}/>
                <Route component={NotFound}/>
            </Switch>
        </Router>
        </ThemeProvider>
    );
}


export default App;
