import React from 'react';
import RideRecord from "./RideRecord"
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

export default function UserProfileCard() {
  return (
    <section style={{ backgroundColor: '#eee' }}>
        <MDBContainer className="py-5">
            <MDBCol>
                <MDBRow>
                    <MDBCol lg="4">
                        <MDBCardBody className="text-center">
                            <h3>Profile</h3>
                        </MDBCardBody>
                        <MDBCard className="mb-4">
                            <MDBCardBody className="text-center">
                                <MDBCardImage
                                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                                    alt="avatar"
                                    className="rounded-circle"
                                    style={{ width: '150px' }}
                                    fluid />
                                <p className="text-muted mb-1">John Doe</p>
                                <p className="text-muted mb-4">Rating: 3.7</p>
                                <div className="d-flex justify-content-center mb-2">
                                    <Button variant="primary">Edit Profile</Button>
                                    <Button variant="danger">Delete Account</Button>
                                </div>
                            </MDBCardBody>
                        </MDBCard>            
                    </MDBCol>
                    <MDBCol lg="8">
                        <MDBCardBody className="text-center">
                            <h3>Recent trips</h3>
                        </MDBCardBody>
                        <MDBCard className="mb-4">
                            <MDBCardBody>
                                <RideRecord tripName="Halifax to New Glasgow" tripData="2/28/2023 4:30pm Overall Rating: 3.5" />
                                <hr />
                                <RideRecord tripName="Antigonish Local Trip" tripData="2/28/2023 4:30pm Overall Rating: 3.5" />
                                <hr />
                                <RideRecord tripName="Truro Local Trip" tripData="2/28/2023 4:30pm Overall Rating: 3.5" />
                                <hr />
                                <RideRecord tripName="Halifix Local Trip" tripData="2/28/2023 4:30pm Overall Rating: 3.5" />
                                <hr />
                                <RideRecord tripName="Halifax to Port Hawkesbury" tripData="2/28/2023 4:30pm Overall Rating: 3.5" />
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBCol>
        </MDBContainer>
    </section>
  );
}