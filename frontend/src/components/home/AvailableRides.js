import React, { Component } from "react"
import { Card, Container, Row, Col, Button } from "react-bootstrap";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { filterRides, addPassenger } from '../../actions/rides';
import { BsArrowRightCircle, BsSearch, BsPlusCircle } from 'react-icons/bs';
import AddModal from "./availableRides/AddModal";
import SearchModal from "./availableRides/SearchModal";
import ProfileModal from "./availableRides/ProfileModal";
import axios from "axios";


export class AvailableRides extends Component {

    constructor(props) {
      super(props);
      this.state = {
        showSearchModal: false,
        showAddModal: false,

        passenger: {
          ride: null,
          user: this.props.user.id
        }
      }
    }

    static propTypes = {
        rides: PropTypes.array.isRequired,
        passengers: PropTypes.array.isRequired,
        ratings: PropTypes.array.isRequired
    }

    submitPassenger = (ride) => {
        const passenger = {ride: ride.id, user: this.props.user.id}
        this.props.addPassenger(passenger, this.props.user, ride);

        this.state.passenger.ride = null;
        //e.target.disabled = true;
        //e.target.innerHTML = "Booked";
    }

    isBooked = (e) => {
        if (this.props.passengers.some(p => ((p.ride === e.target.name) && (p.user === this.props.user.id)))) {
          return true;
        }
        else {
          return false;
        }
    }
      

      // control modal functions
      openSearchModal = () => this.setState({showSearchModal: true});
      closeSearchModal = () => this.setState({showSearchModal: false});
      openAddModal = () => this.setState({showAddModal: true});
      closeAddModal = () => this.setState({showAddModal: false});

      renderItems = () => {
        
        const isBooked = (id) => {
            if (this.props.passengers.some(p => ((p.ride === id) && (p.user === this.props.user.id)))) {
              return true;
            }
            else {
              return false;
            }
        }

        return this.props.rides.map(item => (
            <Col>
              <Card key={item.id} bg="dark" text="white" className="mb-2">
                <Card.Header>{item.source} <BsArrowRightCircle /> {item.destination}</Card.Header>
                <Card.Body>
                  <Card.Subtitle className="mb-2 text-muted">{item.date}, {item.time}</Card.Subtitle>
                  <Card.Text>
                    <ProfileModal driver={item.driver} curUser={this.props.user.id} />
                  </Card.Text>
                  <Button disabled={isBooked(item.id)} variant="success" name={item.id} ride={item} className="btn-block" size="md" onClick={() => this.submitPassenger(item)}>
                    {isBooked(item.id)? "Booked": "Book"}
                  </Button>
                </Card.Body>
              </Card>
            </Col>
        ));
      };

      render() {
        return (
            <section style={{ fontFamily: 'Secular One, sans-serif' }}>
                <section className="p-3 m-3 mt-3" style={{ backgroundColor: '#e0ffe0' }}>
                    <Container className="m-2">
                        <div className='d-flex align-items-center justify-content-between m-2'>
                            <h2>Available Rides:</h2>
                            <div style={{ marginLeft: '0px' }}>
                              <Button variant="success my-auto mr-2" onClick={this.openAddModal}><b>New ride</b> <BsPlusCircle className="ml-2 mt-2 mb-2" /></Button>
                              <Button variant="dark my-auto" onClick={this.openSearchModal}><b>Search</b> <BsSearch className="m-2" /></Button>
                            </div>
                        </div>
                        <Row xs={1} md={4}>
                            {this.renderItems()}
                        </Row>
                    </Container>
                </section>

                <AddModal show={this.state.showAddModal} close={this.closeAddModal} />
                <SearchModal show={this.state.showSearchModal} close={this.closeSearchModal} />
            </section>
        )
      }
}

const mapStateToProps = state => ({
    rides: state.rides.filteredRides,
    user: state.auth.user,
    passengers: state.rides.passengers,
    ratings: state.auth.ratings
})
    
export default connect(mapStateToProps, {filterRides, addPassenger})(AvailableRides);