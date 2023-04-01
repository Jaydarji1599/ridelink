import { Modal, Button, Form, Row, Col, Card, Spinner } from 'react-bootstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { editRide } from '../../../actions/rides';
import { Component, useState } from 'react';
import { LOCATIONS, generateOptionsFromLocations } from '../../../assets/locations';
import PassengerList from './RideDetail/PassengerList';
import { Formik } from 'formik';
import * as Yup from 'yup';

const schema = Yup.object().shape({
    source: Yup.string()
        .required('Please select a valid source.')
        .oneOf(LOCATIONS, 'Please select a valid source.'),

    destination: Yup.string()
        .required('Please select valid destination.')
        .oneOf(LOCATIONS, 'Please select valid destination.')
        .notOneOf([Yup.ref('source')], 'Source and destination cannot be the same.'),

    date: Yup.date()
        .required('Please select a date.')
        .min(new Date(), 'Please select a date later than today.'),

    time: Yup.string()
        .required('Please select a valid time.')
});

export class RideDetailModal extends Component {
    state = {
        show: false,
        close: false,
        loading: false
    }

    static propTypes = {
        editRide: PropTypes.func.isRequired,
    }

    onSubmit = (e) => {
        
        const { source, destination, date, time } = e;
        const ride = { source, destination, date, time };
        ride.driver = this.props.user.id;
        ride.name = this.props.user.first_name;
        ride.id = this.props.ride.id;

        this.setState({loading: true});
        setTimeout(() => {
            this.props.editRide(ride);
            this.setState({loading: false});
            this.handleClose();
        }, 1000);
        
    };

    handleClose = () => { this.setState({ show: false }) };
    handleShow = () => { this.setState({ show: true }) };


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
                    className="search-modal"
                >
                    <Modal.Header>
                        <Modal.Title>Ride Details</Modal.Title>
                        <Button variant="primary" onClick={this.handleClose} className="btn-close">
                            <span aria-hidden="true">&times;</span>
                        </Button>
                    </Modal.Header>
                    <Modal.Body className="gap-3">
                        <Row>
                            <Col>
                                <Formik
                                    validationSchema={schema}
                                    validateOnChange={false}
                                    onSubmit={this.onSubmit}
                                    initialValues={{
                                        source: this.props.ride.source,
                                        destination: this.props.ride.destination,
                                        date: this.props.ride.date,
                                        time: this.props.ride.time
                                    }}
                                >
                                    {({
                                        handleSubmit,
                                        handleChange,
                                        handleBlur,
                                        values,
                                        touched,
                                        errors
                                    }) => (
                                        <>
                                            <Card className="bg-light-box p-3">
                                                <h6>Edit Info: </h6>
                                                <Form noValidate onSubmit={handleSubmit} className="gap-3">
                                                    <Form.Group>
                                                        <Form.Label>Source</Form.Label>
                                                        <Form.Control
                                                            as="select"
                                                            name="source"
                                                            placeholder="Select starting city"
                                                            onChange={handleChange}
                                                            value={values.source}
                                                            isInvalid={errors.source}
                                                        >
                                                            <option>{this.props.ride.source}</option>
                                                            {generateOptionsFromLocations(LOCATIONS.filter(l => l !== this.props.ride.source))}
                                                        </Form.Control>
                                                        <Form.Control.Feedback type="invalid">{errors.source}</Form.Control.Feedback>
                                                    </Form.Group>
                                                    <Form.Group>
                                                        <Form.Label>Destination</Form.Label>
                                                        <Form.Control
                                                            placeholder="Select destination city"
                                                            as="select"
                                                            name="destination"
                                                            value={values.destination}
                                                            onChange={handleChange}
                                                            isInvalid={errors.destination}
                                                        >
                                                            <option>{this.props.ride.destination}</option>
                                                            {generateOptionsFromLocations(LOCATIONS.filter(l => l !== this.props.ride.destination))}
                                                        </Form.Control>
                                                        <Form.Control.Feedback type="invalid">{errors.destination}</Form.Control.Feedback>
                                                    </Form.Group>
                                                    <Form.Group controlId="validationFormik03">
                                                        <Form.Label>Date</Form.Label>
                                                        <Form.Control
                                                            type="date"
                                                            name="date"
                                                            value={values.date}
                                                            onChange={handleChange}
                                                            isInvalid={errors.date}
                                                        />
                                                        <Form.Control.Feedback type="invalid">
                                                            {errors.date}
                                                        </Form.Control.Feedback>
                                                    </Form.Group>
                                                    <Form.Group controlId="validationFormik04">
                                                        <Form.Label>Time</Form.Label>
                                                        <Form.Control
                                                            type="time"
                                                            name="time"
                                                            value={values.time}
                                                            onChange={handleChange}
                                                            isInvalid={errors.time}
                                                        />
                                                        <Form.Control.Feedback type="invalid">
                                                            {errors.time}
                                                        </Form.Control.Feedback>
                                                    </Form.Group>
                                                    <Button variant="success" type="submit" className="mt-4">
                                                        {this.state.loading? <Spinner animation="border" size="sm" /> : 'Save'}
                                                    </Button>
                                                </Form>
                                            </Card>
                                        </>
                                    )}
                                </Formik>
                            </Col>
                            <Col>
                                <h6>Passengers:</h6>
                                <PassengerList ride={this.props.ride} />
                            </Col>
                        </Row>
                    </Modal.Body>
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