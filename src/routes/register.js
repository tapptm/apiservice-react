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

export default function Register() {
  let navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [agency, setAgency] = useState("");
  const [message, setMassage] = useState("");
  const [successful, setSuccessful] = useState(false);

  const onChangeUsername = (e) => {
    setUsername(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onChangeFname = (e) => {
    setFname(e.target.value);
  };

  const onChangeLname = (e) => {
    setLname(e.target.value);
  };

  const onChangeAgency = (e) => {
    setAgency(e.target.value);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setMassage("");

    AuthService.register(username, password, email, fname, lname, agency)
      .then((res) => {
        setMassage(res.data.message);
        setSuccessful(true);
      })
      .catch((err) => {
        const resMessage =
          (err.response && err.response.data && err.response.data.message) ||
          err.message ||
          err.toString();
        setMassage(resMessage);
        setSuccessful(false);
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
            <Icon name="user plus" /> Create your account
          </Header>
          <Form size="large" onSubmit={handleRegister}>
            {!successful && (
              <Segment color="purple">
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
                <Form.Input
                  fluid
                  icon="mail"
                  iconPosition="left"
                  placeholder="Email"
                  type="email"
                  value={email}
                  onChange={onChangeEmail}
                  required
                />
                <Form.Input
                  fluid
                  icon="user"
                  iconPosition="left"
                  placeholder="your first name"
                  value={fname}
                  onChange={onChangeFname}
                  required
                />
                <Form.Input
                  fluid
                  icon="user"
                  iconPosition="left"
                  placeholder="your last name"
                  value={lname}
                  onChange={onChangeLname}
                  required
                />
                <Form.Input
                  fluid
                  icon="building"
                  iconPosition="left"
                  placeholder="agency"
                  value={agency}
                  onChange={onChangeAgency}
                  required
                />

                <Button color="violet" fluid size="large">
                  Sign Up
                </Button>
              </Segment>
            )}
          </Form>
          <Message>
            Already have an account?
            <a href="/login">
              <strong>Login</strong>
            </a>
          </Message>

          {message && (
            <>
              {successful ? (
                <Message positive style={{ textAlign: "left" }}>
                  <Message.Header>
                    Your user registration was successful
                  </Message.Header>
                  <li>{message}</li>
                </Message>
              ) : (
                <Message negative style={{ textAlign: "left" }}>
                  <Message.Header>
                    There was some errors with your submission
                  </Message.Header>
                  <li>{message}</li>
                </Message>
              )}
            </>
          )}
        </Grid.Column>
      </Grid>
    </Container>
  );
}
