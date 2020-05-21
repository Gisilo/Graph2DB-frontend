import React from "react";

const Footer = () => {
  return (
    <div>
      <h5 className="title text-uppercase">Gisilo</h5>
      <p>
        Slogan o qualcos'altro
            </p>
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
      <div className="footer-copyright text-center py-3">
        &copy; {new Date().getFullYear()} Copyright: <a href="https://www.gisilo.com"> Gisilo</a>
      </div>
    </div>
  );
}

export default Footer;