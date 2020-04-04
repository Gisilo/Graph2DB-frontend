import React from 'react';

import './App.scss';
import {CanvasScreen} from "./screens/CanvasScreen";
import { AppBar } from './components/AppBar/AppBar';
import {Footer} from "./components/Footer/Footer";
import { Container, Row, Col } from 'react-bootstrap';

function App() {
    return (
        <Container fluid>
            <Row className="mb-2">
                <Col><AppBar /></Col>
            </Row >
            <Row >
                <Col>
                    <Container fluid className="vh-100">
                        <CanvasScreen/>
                    </Container>
                    ssss
                </Col>
            </Row>
            <Row>
                <Col><Footer /></Col>
            </Row>
        </Container>
    );
}
export default App;
