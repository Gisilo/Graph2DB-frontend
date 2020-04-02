import React from 'react';
import './Footer.css'
import {Col, Row} from "react-bootstrap";
export class Footer extends React.Component {

    render() {
        return(
            <footer style={{bottom:0, position: "absolute", width: "100%", background:"#f8f9fa", boxShadow:"0 -8px 16px rgba(0,0,0,.15)"}}  className="font-small pt-3 mt-3">
                <div className="container text-center text-md-left">
                    <Row>
                        <Col md="6">
                            <h5 className="title">Progetto realizzato di NOI</h5>
                        </Col>
                        <Col md="6">
                            <ul>
                                <li className="list-unstyled">
                                    <a href="#!">Contact Us</a> &nbsp;
                                    <a href="#!">Credits</a>
                                </li>
                            </ul>
                        </Col>
                    </Row>
                </div>
                <div className="footer-copyright text-center py-1">
                    <div className="container">
                        &copy; {new Date().getFullYear()} Copyright
                    </div>
                </div>
            </footer>
        );
    }

}
