//import React, { Navbar, Container, Nav, NavDropdown } from 'react'//;

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';

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
  return (
    <MDBContainer className="py-5">
      <MDBCol>
        <MDBRow>
          <MDBCol lg="12">
            <MDBCardBody className="text-center">
              <MDBIcon className='ms-1' icon='camera' size='10x' />
              <h1>
                FAQ
              </h1>
            </MDBCardBody>
          </MDBCol>
        </MDBRow>
        <hr />
        <MDBRow>
          <Accordion alwaysOpen>
            <Accordion.Item eventKey="0">
              <Accordion.Header as="h4">Accordion Item #1</Accordion.Header>
              <Accordion.Body>
                Example Text.
              </Accordion.Body>
            </Accordion.Item>
            <hr />
            <Accordion.Item eventKey="1">
              <Accordion.Header as="h4">Accordion Item #2</Accordion.Header>
              <Accordion.Body>
                Example text.
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </MDBRow>
        <hr />
        <MDBRow>
          <MDBCardBody className="text-center">
            <h3>
              Have a specific concern?
            </h3>
            <p />
            <Button variant="primary">Contact us!</Button>
          </MDBCardBody>
        </MDBRow>
      </MDBCol>
    </MDBContainer>
  )
}