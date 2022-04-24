import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";
import React, { useState, useEffect } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import AuthService from "./services/authService";
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";

import { Menu, Header, Segment, Icon } from "semantic-ui-react";
import Footer from "./components/footer";


function App() {
  let navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({});
  const [activeItem, setactiveItem] = useState("");

  const handleItemClick = (e, { name }) => setactiveItem(name);

  useEffect(() => {
    const storageUser = AuthService.getCurrentUser();
    if ((Object.keys(currentUser).length === 0) === true) {
      setCurrentUser(storageUser);
    }
  }, []);

  const logOut = () => {
    AuthService.logout();
  };

  return (
    <div className="App">
      <Menu color="violet" inverted secondary>
        <Container>
          <Menu.Item position="left">
            <Header as="h2" style={{ color: "white" }} textAlign="center">
              API SERVICE
            </Header>
          </Menu.Item>

          {currentUser ? (
            <Menu.Item href="/login" onClick={logOut} position="right">
              LogOut
            </Menu.Item>
          ) : (
            <>
              <Menu.Item
                name="login"
                active={activeItem === "login"}
                onClick={handleItemClick}
                position="right"
                as={Link}
                to="/login"
              >
                Sign-In
              </Menu.Item>
              <Menu.Item
                name="register"
                active={activeItem === "register"}
                onClick={handleItemClick}
                as={Link}
                to="/register"
              >
                Sing-Up
              </Menu.Item>
            </>
          )}
        </Container>
      </Menu>
      <Outlet />
      <Footer/>
    </div>
  );
}

export default App;
