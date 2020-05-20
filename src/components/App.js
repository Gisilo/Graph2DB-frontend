import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css'; 
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';

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


function App() {
    return (
        <Router>
            <div className="container">
                <div className="row">
                    <div className="col px-0"><NavBar /></div>
                </div>
                <div className="row">
                    <div className="col px-0">
                        <Switch>
                            <Route path="/editor">
                                <LandingPage />
                            </Route>
                            <Route path="/">
                                <EditorScreen />
                            </Route>
                        </Switch>
                    </div>
                </div>
                <div>
                    <div className="col px-0"><Footer /></div>
                </div>
            </div>
        </Router>

    );
}

export default App;