import React, { Component } from "react"
import { Card, Container, ListGroup, Row, Col, Button, Stack, Tabs, Tab } from "react-bootstrap";
import { BsArrowRightCircle } from 'react-icons/bs';
import { connect } from 'react-redux';
import { deleteRide, getRides } from '../../actions/rides';
import RideDetailModal from "./myProfile/RideDetailModal";
import EditProfile from "./myProfile/EditProfile";
import ProfileDetail from './myProfile/ProfileDetail';
import PassengerRideList from "./myProfile/PassengerRideList";

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
  

export class MyProfile extends Component {
    state = {
        showEditProfile: false
    }
    onDelete = (e) => {
        this.props.deleteRide(e.target.name);
    }

    // control popups/context switches
    openEditModal = () => this.setState({showEditModal: true});
    closeEditModal = () => this.setState({showEditModal: false});
    showEdit = () => this.setState({showEditProfile: true});
    closeEdit = () => this.setState({showEditProfile: false});

    renderItems = () => {
        let filteredRides = this.props.rides.filter(ride => ride.driver === this.props.user.id);
        if (filteredRides.length === 0) {return (<h3 className="p-2 text-center">No rides posted.</h3>)}
        return filteredRides.map(item => (
            <ListGroup.Item as="li" className="bg-dark d-flex justify-content-between mb-2">
                <div className="stack-2">
                    <h6 style={{color: "white"}}>{item.source.toUpperCase()} <BsArrowRightCircle /> {item.destination.toUpperCase()}</h6>
                    <Card.Subtitle className="mb-2 text-muted">{item.date}, {item.time}</Card.Subtitle>
                </div>
                <div>
                    <RideDetailModal ride={item} />
                    <Button variant="danger" name={item.id} onClick={this.onDelete} size="md">
                        Delete
                    </Button>
                </div>
            </ListGroup.Item>
        ));
      };

    render() {
        return (
            <section style={{ fontFamily: 'Secular One, sans-serif' }}>
                <section className="p-3 m-3 mt-3" style={{ backgroundColor: '#e0ffe0' }}>
                    <Container className="m-2">
                        <MDBRow>
                            <MDBCol lg='6'>
                                <Card bg="dark" className="p-3">
                                    {this.state.showEditProfile ? 
                                        <EditProfile switch={this.closeEdit} user={this.props.user} />
                                        :<ProfileDetail switch={this.showEdit} user={this.props.user} />
                                    }
                                </Card>
                                <p />
                            </MDBCol>
                            <MDBCol lg='6'>
                                <Stack>
                                    <h4>My Rides:</h4>
                                    <Tabs defaultActiveKey="driver">
                                        <Tab eventKey="driver" title="Driver">
                                            <ListGroup>
                                                {this.renderItems()}
                                            </ListGroup>
                                        </Tab>
                                        <Tab eventKey="passenger" title="Passenger" variant="dark">
                                            <PassengerRideList />
                                        </Tab>
                                    </Tabs>
                                </Stack>
                            </MDBCol>
                        </MDBRow>
                    </Container>
                </section>
            </section>
        )
    }
}

const mapStateToProps = state => ({
    user: state.auth.user,
    rides: state.rides.rides,
})

export default connect(mapStateToProps, { deleteRide, getRides })(MyProfile);