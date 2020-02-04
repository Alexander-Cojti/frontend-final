import * as React from "react";
import { Link, animateScroll as scroll } from "react-scroll";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import AuthContext from "../adal/Auth";
import "bootstrap/dist/css/bootstrap.min.css";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";



const Header = () => {
  return (
    
    <header>
      <Navbar bg="primary" variant="dark" expand="lg" fixed="top">
        <Container>
          <Navbar.Brand href="#" onClick={() => scroll.scrollToTop()}>
            <Image
              src="https://jfkstorageqymjpzort5hho.blob.core.windows.net/logos-frontend-dq/logo60.png"
              width="50"
              height="50"
            />
                 &nbsp;Document Query
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav">
            <span className="navbar-toggler-icon" />
          </Navbar.Toggle>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Link
                href="#"
                className="btn btn-primary"
                activeClass="active"
                to="home"
                spy={true}
                smooth={true}
                offset={0}
                duration={400}
              >
                Home
              </Link>
              <Link
                href="#"
                className="btn btn-primary"
                activeClass="active"
                to="about"
                spy={true}
                smooth={true}
                offset={0}
                duration={400}
              >
                About
              </Link>
              <Link
                href="#"
                className="btn btn-primary"
                activeClass="active"
                to="contact"
                spy={true}
                smooth={true}
                offset={0}
                duration={400}
              >
                Contact
              </Link>
            </Nav>
            <div className="btn float-right">
            <Button> Welcome! </Button> &nbsp;
              <Button variant="outline-light"
                className="btn btn-outline-primary float-right"
                onClick={() => AuthContext.login()}
              >
                LogIn
              </Button>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
