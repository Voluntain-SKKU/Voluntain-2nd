/*  ./components/Navbar.js     */
import Link from 'next/link';
import Image from 'next/image';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';

// export default - const difference
export const NavigationBar = () => {
  return (
    <div>
      <link // bootstrap css 가져오기
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
      integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
      crossorigin="anonymous"
      />

      <Navbar bg="light" expand="lg" sticky="top">
        <Container>
          <Navbar.Brand href="/">
          <img
            src="/simple_logo.svg"
            width="35"
            height="35"
            className="d-inline-block align-top"
            alt="Voluntain logo"
          />&nbsp;&nbsp;
           VOLUNTAIN</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#link">Link</Nav.Link>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};