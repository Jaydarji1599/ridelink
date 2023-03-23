import { Modal, Button, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addRide } from '../../../actions/rides';
import { Component } from 'react';
import { LOCATIONS, generateOptionsFromLocations } from '../../../assets/locations';
export class AddModal extends Component {
    state = {
        source: '',
        destination: '',
        date: '',
        time: '',
        phone: '',
        seats: 1
    }

    static propTypes = {
        addRide: PropTypes.func.isRequired,
    }

    onSubmit = (e) => {
      e.preventDefault();
      const { source, destination, date, time, phone } = this.state;
      const ride = { source, destination, date, time, phone };
      ride.driver = this.props.user.id;
      this.props.addRide(ride);
      this.setState({
        source: '',
        destination: '',
        date: '',
        time: '',
        phone: '',
        seats: 1
      });
      this.props.close();
    };

    
    onChange = (e) => {this.setState({ [e.target.name]: e.target.value })};

    render() {
        return (
            <>
                <Modal
                    show={this.props.show}
                    onHide={this.props.close}
                    backdrop="static"
                    keyboard={false}
                    style={{ fontFamily: 'Secular One, sans-serif' }}
                >
                    <Modal.Header>
                    <Modal.Title style={{ fontFamily: 'Secular One, sans-serif' }}>Add your Trip!</Modal.Title>
                        <Button variant="light" onClick={this.props.close} className="btn-close">
                            <span aria-hidden="true">&times;</span>
                        </Button>
                    </Modal.Header>
                    <Modal.Body className="gap-3">
                        <Form className="gap-3">
                            <Form.Group>
                                <Form.Label>Source</Form.Label>
                                <Form.Control as="select" name="source" placeholder="Select starting city" onChange={this.onChange}>
                                    <option>-- Select --</option>
                                    {generateOptionsFromLocations(LOCATIONS)}
                                </Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Destination</Form.Label>
                                <Form.Control placeholder="Select destination city" as="select" name="destination" onChange={this.onChange}>
                                    <option>-- Select --</option>
                                    {generateOptionsFromLocations(LOCATIONS)}
                                </Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Date</Form.Label>
                                <Form.Control type="date" name="date" onChange={this.onChange} />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Time</Form.Label>
                                <Form.Control type="time" name="time" onChange={this.onChange} />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="success" onClick={this.onSubmit}>
                        Post
                    </Button>
                    </Modal.Footer>
                </Modal>

            </>
        )
    }
}


const mapStateToProps = state => ({
    user: state.auth.user
})


export default connect(mapStateToProps, {addRide})(AddModal);