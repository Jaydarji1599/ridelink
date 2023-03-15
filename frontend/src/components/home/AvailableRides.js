import React, { Component } from "react"
import { Card, Container, Row, Col, Button } from "react-bootstrap";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getRides, filterRides, addPassenger, getPassengers } from '../../actions/rides';
import { BsArrowRightCircle, BsSearch, BsPlusCircle } from 'react-icons/bs';
import AddModal from "./availableRides/AddModal";
import SearchModal from "./availableRides/SearchModal";
import ProfileModal from "./availableRides/ProfileModal";

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
        passengers: PropTypes.array.isRequired
    }
  
    async componentDidMount() {
        this.props.getRides();
        this.props.getPassengers();
    }

    submitPassenger = (e) => {
        this.state.passenger.ride = Number(e.target.name);
        this.props.addPassenger(this.state.passenger);
        this.state.passenger.ride = null;
        e.target.disabled = true;
        e.target.innerHTML = "Booked";
    }

    isBooked = (e) => {
        console.log("in func")
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
                    <ProfileModal driver={item.driver} />
                  </Card.Text>
                  <Button disabled={isBooked(item.id)} variant="success" name={item.id} className="btn-block" size="md" onClick={this.submitPassenger}>
                    {isBooked(item.id)? "Booked": "Book"}
                  </Button>
                </Card.Body>
              </Card>
            </Col>
        ));
      };

      render() {
        return (
            <>
                <Card className="bg-success p-3 m-3 mt-3">
                    <Container className="m-2">
                        <div className='d-flex align-items-center justify-content-between m-2'>
                            <h2 style={{color: 'white'}}>Available Rides:</h2>
                            <div>
                              <Button variant="dark my-auto mr-2" onClick={this.openAddModal}><b>New ride</b> <BsPlusCircle className="ml-2 mt-2 mb-2" /></Button>
                              <Button variant="outline-light my-auto" onClick={this.openSearchModal}><b>Search</b> <BsSearch className="m-2" /></Button>
                            </div>
                        </div>
                        <Row xs={1} md={4}>
                            {this.renderItems()}
                        </Row>
                    </Container>
                </Card>

                <AddModal show={this.state.showAddModal} close={this.closeAddModal} />
                <SearchModal show={this.state.showSearchModal} close={this.closeSearchModal} />
            </>
        )
      }
}

const mapStateToProps = state => ({
    rides: state.rides.filteredRides,
    user: state.auth.user,
    passengers: state.rides.passengers
})
    
export default connect(mapStateToProps, {getRides, filterRides, addPassenger, getPassengers})(AvailableRides);