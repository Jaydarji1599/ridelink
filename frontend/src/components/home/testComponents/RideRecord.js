//import React, { Navbar, Container, Nav, NavDropdown } from 'react'//;

//import Container from 'react-bootstrap/Container';
//import Nav from 'react-bootstrap/Nav';
//import Navbar from 'react-bootstrap/Navbar';
//import NavDropdown from 'react-bootstrap/NavDropdown';

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

export default function Header({ tripName, tripData }) {
  return (
    <MDBRow>
        <MDBCol col="4">
            <MDBCardBody className="text-center">
                <MDBCardText>{tripName}</MDBCardText>
            </MDBCardBody>
        </MDBCol>
        <MDBCol col="4">
            <MDBCardBody className="text-center">
                <MDBCardText className="text-muted">{tripData}</MDBCardText>
            </MDBCardBody>
        </MDBCol>
        <MDBCol md="4">
            <MDBCardBody className="text-center">
                <Button variant="danger">Delete Ride</Button>
            </MDBCardBody>
        </MDBCol>
    </MDBRow>
  )
}