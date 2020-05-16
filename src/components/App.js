import React from 'react';

import '../styles/App.scss';
import { EditorScreen } from "./screens/EditorScreen";
import { LandingPage } from "./screens/LandingPage";
import { AppBar } from "./AppBar/AppBar";
import { Footer } from "./Footer/Footer";
import { Container, Row, Col, Button } from 'react-bootstrap';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";


function App() {
    return (
        <Router>
            <Container fluid>
                <Row>
                    <Col className="px-0"><AppBar /></Col>
                </Row >
                <Row>
                    <Col className="px-0">
                        <Switch>
                            <Route path="/editor">
                                <EditorScreen />
                            </Route>
                            <Route path="/">
                                <LandingPage />
                            </Route>
                        </Switch>
                    </Col>
                </Row>
                <Row>
                    <Col className="px-0"><Footer /></Col>
                </Row>
            </Container>
        </Router>

    );
}

function Home() {
    return <h2>Home</h2>;
}

function About() {
    return <h2>About</h2>;
}

function Users() {
    return <h2>Users</h2>;
}

export default App;