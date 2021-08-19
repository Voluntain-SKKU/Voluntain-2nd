import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import styles from '../styles/Home.module.css'

/**
 * 
 * @param {*} props 
 * @property
 * - titles: 등록된 course title/id 정보
 * - titles.title: course title
 * - titles.id: course id -> page 링크로 사용
 */

export const NavigationBar = (props) => {
  
  return (
    <div className={styles.navwrapper}>
      <Navbar bg="light" expand="md" className={styles.navbar}>
        <Container className={styles.navcontainer}>
          <Navbar.Brand href="/">
          <img
            src="/favicon.ico"
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
                  <NavDropdown.Item key={item.id} href={"/course/" + item.id}>{item.title}</NavDropdown.Item>
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
