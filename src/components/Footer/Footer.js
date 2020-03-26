/*eslint-disable*/
import React from "react";
// used for making the prop types of this component
import PropTypes from "prop-types";

// reactstrap components
import { Container, Row, Nav, NavItem, NavLink } from "reactstrap";

class Footer extends React.Component {
  render() {
    return (
      <footer className="footer">
        <Container fluid>
          <Nav>
            <NavItem>
              <NavLink href="https://www.mongodb.com/world">MongoDB World 2020</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="https://www.mongodb.com/world">Microservices Nirvana Demo</NavLink>
            </NavItem>
          </Nav>
          <div className="copyright">
            Presented by Jay Runkel and Eugene Kang
          </div>
        </Container>
      </footer>
    );
  }
}

export default Footer;
