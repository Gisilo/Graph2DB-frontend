import React from 'react';

import { Navbar, Nav, Button } from 'react-bootstrap/';

export class AppBar extends React.Component {

  render() {

    return (
      <Navbar bg="primary" expand="lg" className="shadow">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav>
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#project">New Project</Nav.Link>
            <Nav.Link href="#docs">Docs</Nav.Link>
          </Nav>
          <Navbar.Brand href="#home" className="mx-auto" style={{"fontFamily":"Pacifico-Regular"}}>
            Grask
          </Navbar.Brand>
          <Button variant="outline-secondary" style={{ "borderRadius": "35px" }} className="ml-2  ">Log In</Button>{' '}
          <Button variant="info" style={{ "borderRadius": "35px" }} className="ml-2">Sign Up</Button>{' '}
        </Navbar.Collapse>
      </Navbar>
    );

  }
}
