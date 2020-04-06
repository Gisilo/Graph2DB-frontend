import React from 'react';

import { Navbar, Nav, Button } from 'react-bootstrap/';

export class AppBar extends React.Component {

  render() {

    return (
      <Navbar bg="primary" expand="lg" className="shadow-sm rounded-lg border">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav>
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#project">New Project</Nav.Link>
            <Nav.Link href="#docs">Docs</Nav.Link>
          </Nav>
          <Navbar.Brand href="#home" className="mx-auto" style={{"font-family":"Pacifico-Regular"}}>
            Gra.sk
          </Navbar.Brand>
          <Button variant="outline-secondary" style={{ "border-radius": "35px" }} className="ml-2  ">Log In</Button>{' '}
          <Button variant="info" style={{ "border-radius": "35px" }} className="ml-2">Sign Up</Button>{' '}
        </Navbar.Collapse>
      </Navbar>
    );

  }
}
