/*  ./components/Navbar.js     */
import Link from 'next/link';
import Image from 'next/image';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


import { TitleConsumer  } from '../lib/context';

const TitleMenu = () => {
  state = {
    titles: '',
  };

  return (
    <NavDropdown.Item href={"/" /*+ item.id*/}>{
      this.setState({titles: this.props.titles})
    }</NavDropdown.Item>
  )
}

// export default - const difference
export const NavigationBar = (props) => {
  
  return (
      
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
                <TitleConsumer>
                  {({state, actions}) => (
                    <NavDropdown.Item href={"/" /*+ item.id*/}>{state.titles? state.titles : handleTitles()}</NavDropdown.Item>
                  )}
                </TitleConsumer>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Other</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
  );
};

// export const getStaticProps = async () => {
//   const data = await fetch(`${url}/courses/title`);
//   const titles = await data.json();

//   return {
//     props: { titles },
//     revalidate: 1,//몇 초로 할지?
//   };
// };

// title 값이 설정되어 있지 않을 때 받아오는 함수
const handleTitles = async () => {
  console.log("handleTitles in")

  const data = await fetch(`${url}/courses/title`);
  const titles = await data.json();

  return (
    <TitleConsumer>
      {({state, actions}) => (
        <TitleMenu titles={state.titles} setTitles={actions.setTitles(titles)} />
      )}
    </TitleConsumer>
  )
}
