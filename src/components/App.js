import React from 'react';

import '../styles/App.scss';
import { EditorScreen } from "./screens/EditorScreen";
import { AppBar } from "./AppBar/AppBar";
import { Footer } from "./Footer/Footer";
import { Container, Row, Col } from 'react-bootstrap';

function App() {
    return (
        <Container fluid>
            <Row>
                <Col className="px-0"><AppBar /></Col>
            </Row >
            <Row >
                <Col className="px-0">
                    <EditorScreen /> {/* All the pages here? */}
                </Col>
            </Row>
            <Row>
                <Col className="px-0"><Footer /></Col>
            </Row>
        </Container>
    );
}
export default App;
