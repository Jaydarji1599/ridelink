import { Modal, Button, Form, Spinner } from 'react-bootstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addRide } from '../../../actions/rides';
import { Component } from 'react';
import { LOCATIONS, generateOptionsFromLocations } from '../../../assets/locations';
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

export class AddModal extends Component {
    state = {
        loading: false
    }
    static propTypes = {
        addRide: PropTypes.func.isRequired,
    }

    onSubmit = (e) => {
        this.setState({loading: true});
        const { source, destination, date, time } = e;
        const ride = { source, destination, date, time }
        ride.driver = this.props.user.id;
        setTimeout(() => {
            this.setState({loading: false});
            this.props.addRide(ride);
            this.props.close();
        }, 1000);
    };

    render() {
        return (
            <>
                <Modal
                    show={this.props.show}
                    onHide={this.props.close}
                    backdrop="static"
                    keyboard={false}
                    style={{ fontFamily: 'Secular One, sans-serif' }}
                    className='custom-modal'
                >
                    <Modal.Header>
                    <Modal.Title style={{ fontFamily: 'Secular One, sans-serif' }}>Add your Trip!</Modal.Title>
                        <Button variant="dark" onClick={this.props.close} className="btn-close">
                            <span aria-hidden="true">&times;</span>
                        </Button>
                    </Modal.Header>
                    <Modal.Body className="gap-3">
                        <Formik
                            validationSchema={schema}
                            validateOnChange={false}
                            onSubmit={this.onSubmit}
                            initialValues={{
                                source: '',
                                destination: '',
                                date: '',
                                time: ''
                            }}
                        >
                            {({
                                handleSubmit,
                                handleChange,
                                handleBlur,
                                values,
                                touched,
                                isValid,
                                errors
                            }) => (
                                <Form noValidate onSubmit={handleSubmit} className="gap-3">
                                    <Form.Group controlId="validationFormik01">
                                        <Form.Label>Source</Form.Label>
                                        <Form.Control 
                                            as="select" 
                                            name="source" 
                                            placeholder="Select starting city" 
                                            onChange={handleChange}
                                            value={values.source}
                                            isInvalid={errors.source}
                                        >
                                            <option>-- Select --</option>
                                            {generateOptionsFromLocations(LOCATIONS)}
                                        </Form.Control>
                                        <Form.Control.Feedback type="invalid">{errors.source}</Form.Control.Feedback>
                                    </Form.Group>
                                    <br/>
                                    <Form.Group controlId="validationFormik02">
                                        <Form.Label>Destination</Form.Label>
                                        <Form.Control 
                                            placeholder="Select destination city" 
                                            as="select" 
                                            name="destination" 
                                            value={values.destination}
                                            onChange={handleChange}
                                            isInvalid={errors.destination}
                                        >
                                            <option>-- Select --</option>
                                            {generateOptionsFromLocations(LOCATIONS)}
                                        </Form.Control>
                                        <Form.Control.Feedback type="invalid">{errors.destination}</Form.Control.Feedback>
                                    </Form.Group>
                                    <br/>
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
                                    <br/>
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
                                    <Button variant="primary" type="submit" className="mt-4">
                                        {this.state.loading? <Spinner animation="border" size="sm" /> : 'Post'}
                                    </Button>
                                </Form>
                            )}
                        </Formik>
                    </Modal.Body>
                </Modal>

            </>
        )
    }
}


const mapStateToProps = state => ({
    user: state.auth.user
})


export default connect(mapStateToProps, {addRide})(AddModal);