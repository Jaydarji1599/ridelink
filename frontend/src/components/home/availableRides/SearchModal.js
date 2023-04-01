import { Modal, Button, Form, Spinner } from 'react-bootstrap';
import { Component } from 'react';
import { connect } from 'react-redux';
import { filterRides, getRides } from '../../../actions/rides';
import { generateOptionsFromLocations, LOCATIONS } from '../../../assets/locations';

export class SearchModal extends Component {
    state = {
        source: '',
        destination: '',
        startDate: '',
        endDate: '',
        loading: false
    }

    onSubmit = (e) => {
        this.setState({loading: true});
        setTimeout(() => {
            this.props.filterRides(this.state);
            this.setState({loading: false});
            this.props.close();
        }, 1000);
      };

    reset = (e) => {
        this.props.getRides();
        this.props.close();
    }
  
      
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
                    className="search-modal"
                >
                    <Modal.Header>
                    <Modal.Title>Search Rides: </Modal.Title>
                    <Button variant="primary" onClick={this.props.close} className="btn-close">
                        <span aria-hidden="true">&times;</span>
                    </Button>
                    </Modal.Header>
                    <Modal.Body>
                    <Form className="gap-3">
                                <Form.Group>
                                    <Form.Label>Source</Form.Label>
                                    <Form.Control as="select" name="source" placeholder="Select starting city" onChange={this.onChange}>
                                        <option>-- Select --</option>
                                        {generateOptionsFromLocations(LOCATIONS)}
                                    </Form.Control>
                                </Form.Group>
                                <br/>
                                <Form.Group>
                                    <Form.Label>Destination</Form.Label>
                                    <Form.Control placeholder="Select destination city" as="select" name="destination" onChange={this.onChange}>
                                        <option>-- Select --</option>
                                        {generateOptionsFromLocations(LOCATIONS)}
                                    </Form.Control>
                                </Form.Group>
                                <br/>
                                <Form.Group>
                                    <Form.Label>Start Date</Form.Label>
                                    <Form.Control type="date" name="startDate" onChange={this.onChange} />
                                    <br/>
                                    <Form.Label>End Date</Form.Label>
                                    <Form.Control type="date" name="endDate" onChange={this.onChange} />
                                </Form.Group>
                            </Form>
                            <br/>
                            <Button variant="success" onClick={this.onSubmit} className="mr-2">
                                {this.state.loading? <Spinner animation="border" size="sm" /> : 'Search'}
                            </Button>
                            <Button variant="outline-dark" onClick={this.reset}>Reset</Button>
                    </Modal.Body>
                </Modal>
    
            </>
        )
    }
}

export default connect(null, {filterRides, getRides})(SearchModal);