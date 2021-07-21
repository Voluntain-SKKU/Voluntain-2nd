/*  ./components/Navbar.js     */
import Link from 'next/link';
import Image from 'next/image';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'

// export default - const difference
export const NavigationBar = () => {
  return (
    <div>
      <Navbar bg="light" expand="md" fixed="top">
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
            <Nav className="ms-auto">
              <Nav.Link href="#home">HOME</Nav.Link>
              <Nav.Link href="#link">ABOUT</Nav.Link>
              <NavDropdown title="COURSES" id="basic-nav-dropdown">
                {/* href=" 수정 필요 " 
                  loop로 코스 제목/url 수정 */}
                {/* { Object.entries(courses).map((value, index) => {
                  <NavDropdown.Item href={"/" + value[1]}>{value[0]}</NavDropdown.Item>
                })
                } */}
                <NavDropdown.Item href="/id">Scratch</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Python</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">C/C++</NavDropdown.Item>
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
