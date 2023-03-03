import React, { Component } from "react"
import { Row, Col, ListGroup, Tab } from "react-bootstrap";
import RideLinkHeader from "../components/RideLinkHeader";
import AvailableRides from "../components/home/AvailableRides";
import HelpSection from "../components/home/HelpSection";
import MyProfile from "../components/home/MyProfile";
import { TestSection } from "../components/home/TestSection";
export class Home extends Component {

    render() {
      return (
        <>
          <RideLinkHeader />
          <Tab.Container defaultActiveKey="#" fluid>
            <Row>
              <Col sm={2}>
                <ListGroup variant="flush" className="flex-column">
                  <ListGroup.Item variant="dark" action href="#">Rides</ListGroup.Item>
                  <ListGroup.Item variant="dark" action href="#myprofile">My Profile</ListGroup.Item>
                  <ListGroup.Item variant="dark" action href="#help">Help</ListGroup.Item>
                  <ListGroup.Item variant="dark" action href="#test">Test Section</ListGroup.Item>
                </ListGroup>
              </Col>
              <Col>
                <Tab.Content>
                  <Tab.Pane eventKey="#">
                    <AvailableRides />
                  </Tab.Pane>
                  <Tab.Pane eventKey="#myprofile">
                    <MyProfile />
                  </Tab.Pane>
                  <Tab.Pane eventKey="#help">
                    <HelpSection />
                  </Tab.Pane>
                  <Tab.Pane eventKey="#test">
                    <TestSection />
                  </Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
          </>
      )
    }
  }

export default Home;