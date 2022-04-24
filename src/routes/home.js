import React, { useState, useEffect } from "react";
import AuthService from "../services/authService";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { Card, Icon, Button, Input, Table, Label } from "semantic-ui-react";

export default function Home() {
  let navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({});
  const [roles, setRoles] = useState([]);
  const [token, setToken] = useState("");
  const [refreshtoken, setRefreshToken] = useState("");
  const [time, setTime] = useState("");

  //   const checkObjData = (storageUser) => {
  //     if ((Object.keys(storageUser).length === 0) === false) {
  //       setCurrentUser(AuthService.getCurrentUser());
  //     }

  //     navigate("/login");
  //   };

  const refreshToken = () => {
    const timeExpire = new Date(
      new Date().getTime() + 60 * 60000
    ).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

    AuthService.refreshToken(currentUser.username, refreshtoken)
      .then((res) => {
        // setToken(res.data.Token);
        localStorage.setItem(
          "token",
          JSON.stringify({
            token: res.data.Token,
            expire: timeExpire,
          })
        );

        const tokenlocale = JSON.parse(localStorage.getItem("token"));
        setToken(tokenlocale.token);
        setTime(tokenlocale.expire);
        // setTime(timeExpire);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const storageUser = AuthService.getCurrentUser();
    const tokenlocale = JSON.parse(localStorage.getItem("token"));
    setToken(tokenlocale.token);
    setTime(tokenlocale.expire);

    setCurrentUser(storageUser);
    setRoles(storageUser.role_name);
    // setToken(storageUser.accessToken);
    setRefreshToken(storageUser.refreshToken);
  }, []);

  return (
    <Container className="mt-4">
      <Row>
        <Col md="6">
          <Card fluid color="red" className="h-100">
            <Card.Content>
              <Card.Header>Profile</Card.Header>
            </Card.Content>
            <Card.Content style={{ textAlign: "left" }}>
              <Row>
                <Col md="6" xs="6">
                  <Card.Description>
                    <strong>Username</strong>
                    <Card.Description>{currentUser.username}</Card.Description>
                  </Card.Description>
                </Col>
                <Col md="6" xs="6">
                  <Card.Description>
                    <strong>Fullname</strong>
                    <Card.Description>
                      {currentUser.first_name_th} {currentUser.last_name_th}
                    </Card.Description>
                  </Card.Description>
                </Col>
                <Col md="6" xs="6">
                  <Card.Description>
                    <strong>Permission</strong>
                    <Card.Description>
                      {roles.map((role, index) => (
                        <li key={index}>{{ 0: "User", 1: "Admin" }[index]}</li>
                      ))}
                    </Card.Description>
                  </Card.Description>
                </Col>
                <Col md="6" xs="6">
                  <Card.Description>
                    <strong>Email</strong>
                    <Card.Description>{currentUser.email}</Card.Description>
                  </Card.Description>
                </Col>
              </Row>
            </Card.Content>
            <Card.Content style={{ textAlign: "left" }}>
              <Card.Description>
                <strong className="text-dark">refreshToken</strong>{" "}
                <Card.Description className="p-3 mb-2 bg-light text-dark">
                  {currentUser.refreshToken}
                </Card.Description>
              </Card.Description>
            </Card.Content>
          </Card>
        </Col>
        <Col md="6">
          <Card fluid color="yellow" className="h-100">
            <Card.Content>
              <Card.Header>Token</Card.Header>
            </Card.Content>
            <Card.Content style={{ textAlign: "left" }}>
              <Card.Description>
                <strong className="text-dark">accessToken</strong>{" "}
                <Card.Description className="p-3 mb-2 bg-light text-dark">
                  {token ? token : "-"}
                </Card.Description>
              </Card.Description>
            </Card.Content>

            <Card.Content extra>
              <div className="ui two ">
                <Input
                  type="text"
                  placeholder="Search..."
                  action
                  value={refreshtoken}
                  style={{ width: "100%" }}
                >
                  <input disabled />
                  <Button as="div" labelPosition="right" onClick={refreshToken}>
                    <Button icon color="green">
                      <Icon name="redo" />
                    </Button>
                    <Label color="green" basic pointing="left">
                      refreshToken
                    </Label>
                  </Button>
                </Input>
              </div>
            </Card.Content>
            <Card.Content extra>
              token will expire in {time ? <span>{time} (60 minute)</span> : 0}
            </Card.Content>
          </Card>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col>
          <Table color="violet">
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Request</Table.HeaderCell>
                <Table.HeaderCell>Url</Table.HeaderCell>
                <Table.HeaderCell>Headers</Table.HeaderCell>
                <Table.HeaderCell>Params</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              <Table.Row>
                <Table.Cell>
                  <strong>GET</strong>
                </Table.Cell>
                <Table.Cell>
                  https://kmapi.kims-rmuti.com/api/get/co-researcher
                </Table.Cell>
                <Table.Cell>
                  x-access-token: <strong>accessToken</strong>
                </Table.Cell>
                <Table.Cell>-</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>
                  <strong>GET</strong>
                </Table.Cell>
                <Table.Cell>
                  https://kmapi.kims-rmuti.com/api/get/project-type
                </Table.Cell>
                <Table.Cell>
                  x-access-token: <strong>accessToken</strong>
                </Table.Cell>
                <Table.Cell>-</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </Col>
      </Row>
    </Container>
  );
}
