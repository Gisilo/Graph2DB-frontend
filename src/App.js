import React from 'react';

import './App.scss';
import { EditorScreen } from "./screens/EditorScreen";
import { Button } from 'react-bootstrap/';
import { AppBar } from './components/AppBar/AppBar';
import { Footer } from "./components/Footer/Footer";
import { Container, Row, Col } from 'react-bootstrap';

function App() {
    return (
        <Container fluid>
            <Row className="mb-2">
                <Col className="px-0"><AppBar /></Col>
            </Row >
            <Row className="mb-2 mt-4 justify-content-center">
                    <Button className="px-4 mx-2 mx-lg-4" variant="outline-secondary">Carica</Button>{' '}
                    <Button className="px-4 mx-2 mx-lg-4" variant="success">Nuovo</Button>{' '}
                    <Button className="px-4 mx-2 mx-lg-4" variant="outline-success">Salva</Button>{' '}
            </Row>
            <Row >
                <Col>
                    <Container fluid className="vh-100">
                        <EditorScreen />
                    </Container>
                </Col>
            </Row>
            <Row>
                <Col className="px-0"><Footer /></Col>
            </Row>
        </Container>
    );
}
export default App;
