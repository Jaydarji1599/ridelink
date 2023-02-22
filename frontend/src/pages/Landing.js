import React, { Component } from "react";
import {Container, Row, Col, Stack } from 'react-bootstrap';
import bg_landing from "../assets/bg_landing.jpg";
import {MdDirectionsCarFilled} from 'react-icons/md';
import LoginView from '../components/landing/LoginView';
import RegisterView from '../components/landing/RegisterView';
import { Switch, Route } from 'react-router-dom';
class Landing extends Component {
    state = {
        username: '',
        password: '',
        view: 'Login'
    }

    switchView = (v) => {
      this.setState({view: v});
    };

    //onChange = (e) => this.setState({ [e.target.name]: e.target.value });
    render() {
      return (
        <>
        <Container className="min-vh-100 bg-dark" fluid>
          <Row className="min-vh-100 justify-content-center" style={{
                backgroundImage: `url(${bg_landing})`,
                backgroundSize: "cover"
              }}>
              <Stack className="my-auto">
                <h1 className="p-2" style={{textAlign: "center", color: "white"}}><MdDirectionsCarFilled />RideLink</h1>
                {this.state.view === "Login" ? <LoginView switchView={this.switchView} /> : <RegisterView switchView={this.switchView} />}
              </Stack>
          </Row>
        </Container>
        </>
      )
    }
  }
  
export default Landing;