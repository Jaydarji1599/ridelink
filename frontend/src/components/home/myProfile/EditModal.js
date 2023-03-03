import { Modal, Button, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { editRide } from '../../../actions/rides';
import { Component } from 'react';
import { LOCATIONS, generateOptionsFromLocations } from '../../../assets/locations';

export class EditModal extends Component {
    state = {
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
      const { source, destination, date, time, phone } = this.state;
      const ride = { source, destination, date, time, phone };
      ride.name = this.props.user.first_name;
      ride.userId = this.props.user.id;
      ride.id = this.props.ride.id;
      console.log(ride)
      this.props.editRide(ride, this.props.deleteId);
      this.setState({
        source: ride.name,
        destination: ride.source,
        date: ride.date,
        time: ride.time,
        phone: ride.phone
      });
      this.handleClose();
    };

    handleClose = () => {this.setState({show: false})};
    handleShow = () => {this.setState({show: true})};
    
    onChange = (e) => {this.setState({ [e.target.name]: e.target.value })};
    
    render() {
        return (
            <>
                <Button variant="outline-light" className="mr-2" onClick={this.handleShow} size="md">
                    Edit
                </Button>
                <Modal
                    show={this.state.show}
                    onHide={this.handleClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                    <Modal.Title>Edit Trip: </Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="gap-3">
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
                                <Form.Control value={this.props.ride.date} type="date" name="date" onChange={this.onChange} placeholder={this.state.date} />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Time</Form.Label>
                                <Form.Control value={this.props.ride.time} type="time" name="time" onChange={this.onChange} placeholder={this.state.time} />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Contact Number</Form.Label>
                                <Form.Control type="tel" name="phone" onChange={this.onChange} placeholder={this.state.phone} />
                            </Form.Group>
                        </Form>
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
    rides: state.rides.rides
})


export default connect(mapStateToProps, { editRide })(EditModal);