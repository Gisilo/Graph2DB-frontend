import React from 'react';

import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import MainPage from './logged_in/components/layout/MainPage';

function App() {
    return (
        <Router>
            <Switch>
                <Route path="/">
                    <MainPage />
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
