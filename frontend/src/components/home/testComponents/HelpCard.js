//import React, { Navbar, Container, Nav, NavDropdown } from 'react'//;


import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Accordion from 'react-bootstrap/Accordion';
import { Card, Container, Row, Col, Form, Button } from "react-bootstrap";
import { useState } from 'react';
import FAQCard from './FAQCard';

//import Google

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

export default function HelpCard() {

  const [disable, setDisable] = useState(false);
  const [buttonText, setButtonText] = useState('Submit');
  const onClick = () => {
    setDisable(true);
    setButtonText('Submitted');
  }
  return (
    <section>
      <MDBContainer>
        <MDBCol>
          <MDBRow>
            <MDBCol lg="6">
              <MDBCardBody className="text-left">
                <MDBIcon className='ms-1' icon='camera' size='10x' />
                <h1 style={{ fontFamily: 'Rubik, sans-serif' }}>
                  FAQ:
                </h1>
                <p />
              </MDBCardBody>
              <div style={{ fontFamily: 'Secular One, sans-serif' }}>
                <details>
                  <summary>
                    <strong>Quick Start Guide: Driver</strong>
                  </summary>
                  <div>
                    <p />
                    To submit a ride, head to the <strong>Rides</strong> page and select the <strong>New Ride</strong> button. A pop up window will appear asking for details about your ride. Once you enter your details and click the <strong>Post</strong> button, your ride will be added to the list.
                  </div>
                </details>
                <hr />
                <details>
                  <summary>
                    <strong>Quick Start Guide: Passenger</strong>
                  </summary>
                  <div>
                    <p />
                    To find a ride, head to the <strong>Rides</strong> page. There, you will find a list of available rides to choose from. To narrow down your selection, you can use the <strong>Search</strong> button to filter the rides.
                  </div>
                </details>
                <hr />
                <details>
                  <summary>
                    <strong>As a Driver, how will I know if anyone has booked my ride?</strong>
                  </summary>
                  <div>
                    <p />
                    When a passenger books your ride, you will get a notification on your phone. You can also check your list of passengers for a ride by heading to the <strong>My Profile</strong> page, selecting the <strong>Driver</strong> tab, then selecting <strong>Details</strong> for the ride you want info on.
                  </div>
                </details>
                <hr />
                <details>
                  <summary>
                    <strong>How do I communicate with my Driver or Passenger?</strong>
                  </summary>
                  <div>
                    <p />
                    When a passenger books a ride, the driver and passenger will receive a text with each other's phone numbers. Communication can then be done off the platform via text or phone using the phone numbers.
                  </div>
                </details>
                <hr />
                <details>
                  <summary>
                    <strong>As a Passenger, how do I keep track of any ride changes?</strong>
                  </summary>
                  <div>
                    <p />
                    You will be notified via text message of any changes made by a driver to any of your rides.
                  </div>
                </details>
                <hr />
                <details>
                  <summary>
                    <strong>What happends when a Passenger or Driver cancels?</strong>
                  </summary>
                  <div>
                    <p />
                    A text message notification is sent to all affected passengers and the driver, notifying them of the cancellation.
                  </div>
                </details>
              </div>
              <hr />
            </MDBCol>
            <MDBCol lg="6">
              <MDBCardBody className="text-left">
                <MDBIcon className='ms-1' icon='camera' size='10x' />
                <h1 style={{ fontFamily: 'Rubik, sans-serif' }}>
                  Have a specific concern? Contact us!
                </h1>
                <p />
              </MDBCardBody>
              <MDBCardBody className="text-center" style={{ fontFamily: 'Secular One, sans-serif' }}>
                <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="name@example.com" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Your question</Form.Label>
                        <Form.Control as="textarea" rows={3} />
                    </Form.Group>
                    <Button variant="success" disabled={disable} onClick={onClick}>{buttonText}</Button>
                </Form>
              </MDBCardBody>
            </MDBCol>
          </MDBRow>
        </MDBCol>
      </MDBContainer>
    </section>
  )
}