import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css'; 
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
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
                <MDBRow>
                    <MDBCol><NavBar /></MDBCol>
                </MDBRow>
                <MDBRow>
                    <MDBCol>
                        <Switch>
                            <Route path="/editor">
                                <LandingPage />
                            </Route>
                            <Route path="/">
                                <EditorScreen />
                            </Route>
                        </Switch>
                    </MDBCol>
                </MDBRow>
                <MDBRow>
                    <MDBCol><Footer /></MDBCol>
                </MDBRow>
        </Router>

    );
}

export default App;