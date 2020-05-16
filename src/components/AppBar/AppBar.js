import React from 'react';

import { Navbar, Nav, Button } from 'react-bootstrap/';
import { LinkContainer } from 'react-router-bootstrap'

export class AppBar extends React.Component {

  render() {

    return (
      <Navbar sticky="top" bg="transparent" expand="lg" className="py-1 shadow align-middle">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav>
            <LinkContainer className="py-0" to="/">
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>
            <LinkContainer className="py-0" to="/editor">
              <Nav.Link>New Project</Nav.Link>
            </LinkContainer>
            <LinkContainer className="py-0" to="/docs">
              <Nav.Link>Docs</Nav.Link>
            </LinkContainer>
          </Nav>
          <Navbar.Brand className="mx-auto" style={{ "fontFamily": "Pacifico-Regular" }}>
          <LinkContainer className="py-0" to="/">
          <Nav.Link className="text-dark">Grask</Nav.Link>
            </LinkContainer>
          </Navbar.Brand>
          <Button variant="warning" className="ml-2 py-0 rounded-lg">Log In</Button>{' '}
          <Button variant="info" className="mx-2 py-0 rounded-lg">Sign Up</Button>{' '}
        </Navbar.Collapse>
      </Navbar>
    );

  }
}
