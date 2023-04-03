import React, { Component } from "react";
import { Card, Button, Form, Row, Col, Spinner } from 'react-bootstrap';
import { Link, Navigate } from "react-router-dom";
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import { register } from "../../actions/auth";
import {Formik} from 'formik';
import * as Yup from 'yup';
import axios from "axios";

const schema = Yup.object().shape({
    username: Yup.string()
    .required('Username is required.')
    .min(6, "Username must be at least 6 characters.")
    .test('username-exists', 'Username is already taken.', async function(value) {
        const response = await axios.get(`api/getuser/?username=${value}`);
        console.log(response);
        return !response.data.length > 0;
    }),
    email: Yup.string()
    .required('Email is required.')
    .email('Invalid email.')
    .test('email-exists', 'Email is already in use.', async function(value) {
        const response = await axios.get(`api/getuser/?email=${value}`);
        console.log(response);
        return !response.data.length > 0;
    }),
    firstName: Yup.string().required('First name required.'),
    lastName: Yup.string().required('Last name required.'),
    password1: Yup.string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/,
      'Password must be at least 8 characters, contain at least one lowercase letter, one uppercase letter, one number, and one special character'
    )
    .required('Password is required'),
    password2: Yup.string()
        .oneOf([Yup.ref('password1'), null], 'Passwords must match')
        .required('Confirm password is required'),
    phone: Yup.string()
        .matches(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/, 'Invalid phone number, format is 123-456-7890')
        .required('Phone number is required'),
})

class RegisterView extends Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
    }

    state = {
        loading: false
    }

    

    static propTypes = {
        register: PropTypes.func.isRequired,
        isAuthenticated: PropTypes.bool,
        registrationError: PropTypes.bool
    }

    onSubmit = (values) => { 
        const {username, email, firstName, lastName, phone} = values;
        const registration = {username, email, firstName, lastName, phone};
        registration.password = values.password1;
        this.setState({loading: true});
        setTimeout(() => {
            this.setState({loading: false});
            this.props.register(registration);
        }, 1000);
        
    };

    render() {
        if(this.props.isAuthenticated) {
            return <Navigate to="/" />
        }
        return (
            <Card className="bg-dark m-3 p-2" style={{ width: '400px' }}>
            <Formik
                    validationSchema={schema}
                    validateOnChange={false}
                    onSubmit={this.onSubmit}
                    initialValues={{
                        username: '',
                        email: '',
                        firstName: '',
                        lastName: '',
                        phone: '',
                        password1: '',
                        password2: ''
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
                        <Form noValidate onSubmit={handleSubmit} className="p-3 m-3 gap-3">
                            <Form.Label style={{color: "white"}}>User Profile: </Form.Label>
                            <Form.Group className="mb-2" controlId="validationFormik01">
                                <Form.Control 
                                type="username" 
                                placeholder="Username" 
                                name="username" 
                                onChange={handleChange}
                                value={values.username}
                                isInvalid={errors.username}
                                />
                                <Form.Control.Feedback type="invalid">{errors.username}</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mb-2" controlId="validationFormik02">
                                <Form.Control 
                                type="email" 
                                placeholder="Email" 
                                name="email" 
                                onChange={handleChange}
                                value={values.email} 
                                isInvalid={errors.email}
                                />
                                <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                            </Form.Group>
                            <Row>
                                <Col className="mr-0">
                                    <Form.Group className="mb-2 pr-2" controlId="validationFormik03">
                                    <Form.Control 
                                    type="name" 
                                    placeholder="First Name" 
                                    name="firstName" 
                                    onChange={handleChange}
                                    value={values.firstName}
                                    isInvalid={errors.firstName}
                                    />
                                    <Form.Control.Feedback type="invalid">{errors.firstName}</Form.Control.Feedback>
                                </Form.Group>
                                </Col>
                                <Col className="ml-0 pl-0">
                                    <Form.Group className="mb-2" controlId="validationFormik04">
                                        <Form.Control 
                                        type="name" 
                                        placeholder="Last Name" 
                                        name="lastName" 
                                        onChange={handleChange}
                                        value={values.lastName}
                                        isInvalid={errors.lastName}
                                        />
                                        <Form.Control.Feedback type="invalid">{errors.lastName}</Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                            </Row>
                            
                            
                            <Form.Group className="mb-2" controlId="validationFormik05">
                                <Form.Control 
                                type="tel" 
                                placeholder="Phone" 
                                name="phone" 
                                onChange={handleChange}
                                value={values.phone}
                                isInvalid={errors.phone}
                                />
                                <Form.Control.Feedback type="invalid">{errors.phone}</Form.Control.Feedback>
                            </Form.Group>
                                <Form.Group className="mb-2" controlId="validationFormik06">
                                    <Form.Control 
                                    type="password" 
                                    placeholder="Password" 
                                    name="password1" 
                                    onChange={handleChange}
                                    value={values.password1}
                                    isInvalid={errors.password1} 
                                    />
                                    <Form.Control.Feedback type="invalid">{errors.password1}</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="validationFormik07">
                                    <Form.Control 
                                    type="password" 
                                    placeholder="Repeat Password" 
                                    name="password2" 
                                    onChange={handleChange}
                                    value={values.password2}
                                    isInvalid={errors.password2} 
                                    />
                                    <Form.Control.Feedback type="invalid">{errors.password2}</Form.Control.Feedback>
                                </Form.Group>
                                <Button className="block" variant="outline-light" type="submit">
                                    {this.state.loading? <Spinner animation="border" size="sm" /> : 'Sign up'}
                                </Button>
                            <p className="mt-2" style={{color: "black", alignSelf: "right"}}>Already have an account? <Link style={{color: "white"}} onClick= {() => this.props.switchView("Login")}>Login here.</Link></p>
                        </Form>
                    )}
                </Formik>
            </Card>
        )
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    registrationError: state.auth.registrationError
})

export default connect(mapStateToProps, { register })(RegisterView);