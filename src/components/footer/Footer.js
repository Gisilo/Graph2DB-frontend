import React from "react";
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";

const Footer = () => {
  return (
    <MDBFooter color="blue" className="font-small pt-4 mt-4">
      <MDBContainer fluid className="text-center text-md-left">
        <MDBRow>
          <MDBCol md="6">
            <h5 className="title text-uppercase">Gisilo</h5>
            <p>
				Slogan o qualcos'altro
            </p>
          </MDBCol>
          <MDBCol md="6">
            <h5 className="text-uppercase">Connect</h5>
            <ul className="list-unstyled">
              <li>
                <a href="#!">Meet the team</a>
              </li>
              <li>
                <a href="#!">Contacts Us</a>
              </li>
              <li>
                <a href="#!">TODO: riga icone social </a>
              </li>
            </ul>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <div className="footer-copyright text-center py-3">
        <MDBContainer fluid>
          &copy; {new Date().getFullYear()} Copyright: <a href="https://www.gisilo.com"> Gisilo</a>
        </MDBContainer>
      </div>
    </MDBFooter>
  );
}

export default Footer;