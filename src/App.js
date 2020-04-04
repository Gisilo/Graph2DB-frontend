import React from 'react';

import './App.scss';
import {EditorScreen} from "./screens/EditorScreen";
import {Button} from 'react-bootstrap/';
import {AppBar} from './components/AppBar/AppBar';
import {Footer} from "./components/Footer/Footer";
import { Container, Row, Col } from 'react-bootstrap';

function App() {
    return (
        <Container fluid>
            <Row className="mb-2">
                <Col><AppBar/></Col>
            </Row >
            <Row>
                <div style={{padding: "auto"}}>
                    <Button className="btn-primary">Salva</Button>{' '}
                    <Button variant="secondary">Carica</Button>{' '}
                    <Button variant="success">Nuovo</Button>{' '}
                    <Button variant="info">Genera schema</Button>{' '}
                    <Button variant="danger">erere</Button>{' '}
                </div>
            </Row>
            <Row >
                <Col>
                    <Container fluid className="vh-100">
                        <EditorScreen/>
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
