//import React, { Navbar, Container, Nav, NavDropdown } from 'react'//;

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';

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

export default function FAQCard() {
  return (
    <MDBContainer className="py-5">
      
      
      
      <details style={{ fontFamily: 'Arial, sans-serif' }}>
        <summary>
          <strong>Quick Start Guide: Driver</strong>
        </summary>
        <div>
          [] = unsure <div />
          -<div />
          1. To submit a ride, head to the [RIDES] page and [select new ride]. A pop up window will appear asking for details
        </div>
      </details>
      <hr />
      <details>
        <summary>
          <strong>Quick Start Guide: Rider</strong>
        </summary>
        <div>
          1. To submit a ride, head to the [RIDES] page and [select new ride]. A pop up window will appear asking for details
        </div>
      </details>
      <hr />
      <details>
        <summary>
          <strong>How do I communicate with my Driver or Rider?</strong>
        </summary>
        <div>
          (Depends on how the UI looks)

          (a) through the phone thing when you click on a ride
          b) through the chat thing

          more info needed!!!)
        </div>
      </details>
      <hr />
      <details>
        <summary>
          <strong>[Searching for rides]</strong>
        </summary>
        <div>
         (Depends on how the UI looks)

          (a) through the phone thing when you click on a ride
          b) through the chat thing

          more info needed!!!)
        </div>
      </details>
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
        <hr />
      </MDBCol>
    </MDBContainer>
  )
}