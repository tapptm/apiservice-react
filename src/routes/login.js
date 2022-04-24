import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import AuthService from "../services/authService";

import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment,
  Icon,
} from "semantic-ui-react";

export default function Login() {
  let navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMassage] = useState("");

  const onChangeUsername = (e) => {
    setUsername(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setMassage("");

    AuthService.login(username, password)
      .then(() => {
        navigate("/home");
        navigate(0);
      })
      .catch((err) => {
        const resMessage =
          (err.response && err.response.data && err.response.data.message) ||
          err.message ||
          err.toString();
        setMassage(resMessage);
      });
  };

  useEffect(() => {
    // const storageUser = authService.getCurrentUser();
    // console.log(storageUser);
  }, []);

  return (
    <Container>
      <Grid
        textAlign="center"
        style={{ height: "80vh" }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" color="violet" textAlign="center">
            <Icon name="sign in" /> Sign-in to your account
          </Header>
          <Form size="large" onSubmit={handleLogin}>
            <Segment  color="purple">
              <Form.Input
                fluid
                icon="user"
                iconPosition="left"
                placeholder="Username"
                value={username}
                onChange={onChangeUsername}
                required
              />
              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                type="password"
                value={password}
                onChange={onChangePassword}
                required
              />

              <Button color="violet" fluid size="large">
                Login
              </Button>
            </Segment>
          </Form>
          <Message>
            New to us? <a href="/register">Sign Up</a>
          </Message>

          {message && (
            <Message negative style={{ textAlign: "left" }}>
              <Message.Header>
                There was some errors with your submission
              </Message.Header>
              <li>{message}</li>
            </Message>
          )}
        </Grid.Column>
      </Grid>
    </Container>
  );
}
