import React, { Component } from "react";
import {Container, Row, Col, Card, Button, Form} from 'react-bootstrap';
import bg_landing from "../assets/bg_landing.jpg";
import { Link } from "react-router-dom";

class Login extends Component {

    render() {
      return (
        <>
        <Container className="min-vh-100 bg-dark" fluid>
          <Row className="min-vh-100">
            <Col className="my-auto">
              <h1 className="mt-3 p-2" style={{textAlign: "center", color: "white"}}>RideLink</h1>
              <Card className="bg-success m-3 p-2">
                <Form className="p-3 gap-3">
                  <Form.Group className="mb-3" controlId="formGroupEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formGroupPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                  </Form.Group>
                  <Link to="/home">
                    <Button variant="outline-light" type="submit">
                        Sign in
                    </Button>
                  </Link>
                </Form>
              </Card>
            </Col>
              
            <Col className="min-vh-100 my-auto" style={{
                backgroundImage: `url(${bg_landing})`,
                backgroundSize: "cover"
              }}>
                <h1 style={{color: "white"}}>Ridesharing made easy.</h1>
            </Col>
          </Row>
        </Container>
        </>
      )
    }
  }
  
export default Login;