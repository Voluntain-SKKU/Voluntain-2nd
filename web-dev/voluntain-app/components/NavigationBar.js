/*  ./components/Navbar.js     */
import Link from 'next/link';
import Image from 'next/image';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import styles from '../styles/Home.module.css'

// export default - const difference
export const NavigationBar = (props) => {
  return (
    <div className={styles.navwrapper}>
      <Navbar bg="light" expand="md" className={styles.navbar}>
        <Container className={styles.navcontainer}>
          <Navbar.Brand href="/">
          <img
            src="/simple_logo.svg"
            width="35"
            height="35"
            className="d-inline-block align-top"
            alt="Voluntain logo"
          />&nbsp;&nbsp;
           <span className={styles.titlefont}>VOLUNTAIN</span></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav"> 
            <Nav className="ms-auto">
              <Nav.Link href="/">HOME</Nav.Link>
              <Nav.Link href="/about">ABOUT</Nav.Link>
              <Nav.Link href="/question">Q&A</Nav.Link>
              <NavDropdown title="COURSES" id="basic-nav-dropdown">
                {props.titles.map((item) => (
                  <NavDropdown.Item href={"/course/" + item.id}>{item.title}</NavDropdown.Item>
                ))}
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Other</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};
