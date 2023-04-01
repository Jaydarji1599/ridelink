import React, { Component } from "react"
import { Row, Col, ListGroup, Tab } from "react-bootstrap";
import RideLinkHeader from "../components/RideLinkHeader";
import AvailableRides from "../components/home/AvailableRides";
import HelpSection from "../components/home/HelpSection";
import MyProfile from "../components/home/MyProfile";
import { connect } from "react-redux";
import { getRides, getPassengers } from '../actions/rides';
import { getRatings } from "../actions/auth";
import {MDBCol, MDBRow} from 'mdb-react-ui-kit';

export class Home extends Component {

    async componentDidMount() {
      this.props.getRides();
      this.props.getPassengers();
      this.props.getRatings();
    }
    
    render() {
      return (
        <section className="bg-section">
          <RideLinkHeader />
          <Tab.Container defaultActiveKey="#" fluid>
            <MDBRow>
              <MDBCol md='2' className="nav-col bg-dark pr-0">
                <ListGroup variant="flush" className="flex-column mr-0">
                  <ListGroup.Item action href="#"><strong>Rides</strong></ListGroup.Item>
                  <ListGroup.Item action href="#myprofile"><strong>My Profile</strong></ListGroup.Item>
                  <ListGroup.Item action href="#help"><strong>Help</strong></ListGroup.Item>
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
                </Tab.Content>
              </MDBCol>
            </MDBRow>
          </Tab.Container>
        </section>
      )
    }
  }

export default connect(null, {getRides, getPassengers, getRatings})(Home);