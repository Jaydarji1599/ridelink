import React, { Component } from "react";
import {Container, Row, Col, Card, Button, Form} from 'react-bootstrap';
import bg_landing from "../assets/bg_landing.jpg";
import { Link, useHistory } from "react-router-dom";
import {MdDirectionsCarFilled} from 'react-icons/md';
import axios from 'axios';

class Login extends Component {
    state = {
        username: '',
        password: ''
    }

    onSubmit = (e) => {
        e.preventDefault();
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const body = JSON.stringify(this.state);
        axios
        .post('/api/auth/login/', body, config)
        .then((res) => {
            window.location.href += "home";
        })
        .catch((err) => {
          console.log("login not successful");
        });
    };

    onChange = (e) => this.setState({ [e.target.name]: e.target.value });
    render() {
      return (
        <>
        <Container className="min-vh-100 bg-dark" fluid>
          <Row className="min-vh-100" style={{
                backgroundImage: `url(${bg_landing})`,
                backgroundSize: "cover"
              }}>
            <Col className="my-auto" sm={4}>
            </Col>
              
            <Col className="my-auto" sm={4}>
              <h1 className="p-2" style={{textAlign: "center", color: "white"}}><MdDirectionsCarFilled />RideLink</h1>
                <Card className="bg-success m-3 p-2">
                  <Form className="p-3 m-3 gap-3">
                    <Form.Group className="mb-3" controlId="formGroupEmail">
                      <Form.Label style={{color: "white"}}>Username</Form.Label>
                      <Form.Control type="username" placeholder="Enter username" name="username" onChange={this.onChange}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupPassword">
                      <Form.Label style={{color: "white"}}>Password</Form.Label>
                      <Form.Control type="password" placeholder="Password" name="password"  onChange={this.onChange}/>
                    </Form.Group>
                    <Link to="/home">
                      <Button variant="outline-light" type="submit" onClick={this.onSubmit}>
                          Sign in
                      </Button>
                    </Link>
                    <br />
                    <p className="mt-2" style={{color: "black"}}>New around here? <a href="#" style={{color: "white"}}><b> Register now!</b></a></p>
                  </Form>
                </Card>
            </Col>
            <Col className="min-vh-100 my-auto" sm={4}>
            </Col>
          </Row>
        </Container>
        </>
      )
    }
  }
  
export default Login;