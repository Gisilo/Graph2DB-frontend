import React from 'react';

import { Navbar, Nav, Button} from 'react-bootstrap/';

export class AppBar extends React.Component {

  render() {

    return (
      <Navbar bg="primary" expand="lg" className="shadow-sm rounded-lg border">
        <Navbar.Brand href="#home">
      Gra.sk
    </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#project">New Project</Nav.Link>
            <Nav.Link href="#docs">Docs</Nav.Link>
          </Nav>
          <Button variant="outline-info" style={{"border-radius": "35px"}} size="sm" className="ml-2  ">Log In</Button>{' '}
          <Button variant="info" style={{"border-radius": "35px"}} className="ml-2">Sign Up</Button>{' '}
        </Navbar.Collapse>
      </Navbar>
    );

  }
}
