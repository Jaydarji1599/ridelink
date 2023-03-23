import React, { Component } from "react"
import { Row, Col, ListGroup, Tab } from "react-bootstrap";
import RideLinkHeader from "../components/RideLinkHeader";
import AvailableRides from "../components/home/AvailableRides";
import HelpSection from "../components/home/HelpSection";
import MyProfile from "../components/home/MyProfile";
import { TestSection } from "../components/home/TestSection";
<<<<<<< HEAD
import { connect } from "react-redux";
import { getRides, getPassengers } from '../actions/rides';
import { getRatings } from "../actions/auth";
=======

import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBBreadcrumb,
  MDBBreadcrumbItem,
  MDBProgress,
  MDBProgressBar,
  MDBIcon,
  MDBListGroup,
  MDBListGroupItem
} from 'mdb-react-ui-kit';
>>>>>>> 67dd52a0e6211a5d1c2bd5ba31817caccf7fc3b4

export class Home extends Component {

    async componentDidMount() {
      this.props.getRides();
      this.props.getPassengers();
      this.props.getRatings();
    }
    
    render() {
      return (
        <section style={{ backgroundColor: '#e0ffe0' }}>
          <RideLinkHeader />
          <Tab.Container defaultActiveKey="#" fluid>
            <MDBRow>
              <MDBCol md='2'>
                <ListGroup variant="flush" className="flex-column">
                  <ListGroup.Item variant="dark" action href="#" style={{ backgroundColor: '#5bd25b' }}><strong>Rides</strong></ListGroup.Item>
                  <ListGroup.Item variant="dark" action href="#myprofile" style={{ backgroundColor: '#5bd25b' }}><strong>My Profile</strong></ListGroup.Item>
                  <ListGroup.Item variant="dark" action href="#help" style={{ backgroundColor: '#5bd25b' }}><strong>Help</strong></ListGroup.Item>
                  <ListGroup.Item variant="dark" action href="#test" style={{ backgroundColor: '#5bd25b' }}><strong>Test Section</strong></ListGroup.Item>
                </ListGroup>
              </MDBCol>
              <MDBCol md='10'>
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
              </MDBCol>
            </MDBRow>
          </Tab.Container>
        </section>
      )
    }
  }

export default connect(null, {getRides, getPassengers, getRatings})(Home);