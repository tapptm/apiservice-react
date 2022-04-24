import React, { useState, useEffect } from "react";
import {
  Container,
  Divider,
  Dropdown,
  Grid,
  Header,
  Image,
  List,
  Menu,
  Segment,
} from "semantic-ui-react";

import AuthService from "../services/authService";

import { Link } from "react-router-dom";

const Footer = () => {
  const [currentUser, setCurrentUser] = useState({});

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
    <div>
      <Segment
        // color="violet"
        inverted
        vertical
        style={{ margin: "2.5em 0em 0em", padding: "5em 0em" }}
      >
        <Container textAlign="center">
          <Grid divided inverted >
            <Grid.Column width={8}>
              <Header inverted as="h4" content="Menu" />
              <List link inverted>
                {currentUser ? (
                  <>
                    <List.Item onClick={logOut} as={"a"} href="/login">
                      LogOut
                    </List.Item>
                  </>
                ) : (
                  <>
                    <List.Item as={Link} to="/register">
                      Register
                    </List.Item>
                    <List.Item as={Link} to="/login">
                      Login
                    </List.Item>
                  </>
                )}

                {/* <List.Item as="a">Link Three</List.Item>
              <List.Item as="a">Link Four</List.Item> */}
              </List>
            </Grid.Column>
            <Grid.Column width={8}>
              <Header inverted as="h4" content="API SERVICE" />
              <p>
                It is a website that provides API services for those who want to
                use information for website development. The user will generate
                a key token to be used to access the data.
              </p>
            </Grid.Column>
          </Grid>

          <Divider inverted section />
          {/* <Image centered size="mini" src="/logo.png" /> */}
          <List horizontal inverted divided link size="small">
            <List.Item as="a" href="#">
              Site Map
            </List.Item>
            <List.Item as="a" href="#">
              Contact Us
            </List.Item>
            <List.Item as="a" href="#">
              Terms and Conditions
            </List.Item>
            <List.Item as="a" href="#">
              Privacy Policy
            </List.Item>
          </List>
        </Container>
      </Segment>
    </div>
  );
};

export default Footer;
