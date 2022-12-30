import React from 'react';

import {
    Nav, Navbar,
    NavDropdown,
    Form, FormControl,Container
} from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../actions/userActions';


const Header = ({setSearch}) => {
  
  
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  console.log(userInfo)

  const navigate = useNavigate();
  const dispatch = useDispatch();

  

  const logoutHandler = () => {
    dispatch(logout());
    navigate("/");
  };

 
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand>
          <Link to="/">Notes App</Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="m-auto">
            <Form inline>
              <FormControl
                type="text"
                placeholder="Search"
                className="mr-sm-2"
                onChange={(e) => setSearch(e.target.value)}
              />
            </Form>
          </Nav>
          {userInfo ? (
            <Nav className="me-auto">
              <Nav.Link>
                <Link to="/mynotes">My Notes</Link>
              </Nav.Link>
              <NavDropdown
                title={userInfo?.name}
                id="basic-nav-dropdown"
              >
                <NavDropdown.Item href="/profile">
                  My Profile
                </NavDropdown.Item>

                <NavDropdown.Divider />
                <NavDropdown.Item onClick={logoutHandler}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          ) : (
            <nav>
              <Nav.Link>
                <Link to="/login">Login</Link>
              </Nav.Link>
            </nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header
