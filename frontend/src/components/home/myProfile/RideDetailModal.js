import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { editRide } from '../../../actions/rides';
import { Component, useState } from 'react';
import { LOCATIONS, generateOptionsFromLocations } from '../../../assets/locations';
import PassengerList from './RideDetail/PassengerList';


export class RideDetailModal extends Component {
    state = {
        
        // NEST THESE
        // these dont change
        driver: this.props.user.id,
        name: this.props.user.first_name,
        id: this.props.ride.id,
        // these do
        source: this.props.ride.source,
        destination: this.props.ride.destination,
        date: this.props.ride.date,
        time: this.props.ride.time,
        phone: this.props.ride.phone,
        

        show: false,
        close: false
    }

    static propTypes = {
        editRide: PropTypes.func.isRequired,
    }

    onSubmit = (e) => {
      e.preventDefault();

      // This sucks and I hate it.
      this.props.editRide(this.state);
      this.handleClose();
    };

    handleClose = () => {this.setState({show: false})};
    handleShow = () => {this.setState({show: true})};
    
    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    };
    
    render() {
        return (
            <>
                <Button variant="outline-light" className="mr-2" onClick={this.handleShow} size="md">
                    Details
                </Button>
                <Modal
                    show={this.state.show}
                    onHide={this.handleClose}
                    backdrop="static"
                    keyboard={false}
                    size="lg"
                    style={{ fontFamily: 'Secular One, sans-serif' }}
                >
                    <Modal.Header>
                    <Modal.Title>Ride Details</Modal.Title>
                    <Button variant="light" onClick={this.handleClose} className="btn-close">
                        <span aria-hidden="true">&times;</span>
                    </Button>
                    </Modal.Header>
                    <Modal.Body className="gap-3">
                        <Row>
                            <Col>
                                <h6>Edit Info: </h6>
                                <Form className="gap-3">
                                    <Form.Group>
                                        <Form.Label>Source</Form.Label>
                                        <Form.Control as="select" name="source" onChange={this.onChange}>
                                        <option>{this.props.ride.source}</option>
                                        {generateOptionsFromLocations(LOCATIONS.filter(l => l !== this.props.ride.source))}
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Destination</Form.Label>
                                        <Form.Control as="select" name="destination" onChange={this.onChange}>
                                        <option>{this.props.ride.destination}</option>
                                        {generateOptionsFromLocations(LOCATIONS.filter(l => l !== this.props.ride.destination))}
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Date</Form.Label>
                                        <Form.Control value={this.props.ride.date} type="date" name="date" onChange={this.onChange} />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Time</Form.Label>
                                        <Form.Control value={this.props.ride.time} type="time" name="time" onChange={this.onChange} />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Contact Number</Form.Label>
                                        <Form.Control type="tel" name="phone" onChange={this.onChange} placeholder={this.state.phone} />
                                    </Form.Group>
                                </Form>
                            </Col>
                            <Col>
                                <h6>Passengers:</h6>
                                <PassengerList ride={this.props.ride} />
                            </Col>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="success" onClick={this.onSubmit}>
                        Save
                    </Button>
                    </Modal.Footer>
                </Modal>

            </>
        )
    }

}

const mapStateToProps = state => ({
    user: state.auth.user,
    rides: state.rides.rides,
    passengers: state.rides.passengers
})


export default connect(mapStateToProps, { editRide })(RideDetailModal);