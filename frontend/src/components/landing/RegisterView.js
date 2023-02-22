import React, { Component } from "react";
import { Card, Button, Form } from 'react-bootstrap';
import { Link, Navigate } from "react-router-dom";
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import { register } from "../../actions/auth";

class RegisterView extends Component {
    state = {
        email: '',
        username: '',
        password: '',
        password2: ''
    }

    static propTypes = {
        register: PropTypes.func.isRequired,
        isAuthenticated: PropTypes.bool,
        registrationError: PropTypes.bool
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.state.pwdError = false;
        const { email, username, password, password2 } = this.state;
        if (password !== password2) {
            this.state.pwdError = true
        } else {
            this.props.register({email, username, password})
        }
    };

    onChange = (e) => {this.setState({ [e.target.name]: e.target.value })};

    render() {
        if(this.props.isAuthenticated) {
            return <Navigate to="/" />
        }
        return (
            <Card className="bg-dark m-3 p-2">
                <Form className="p-3 m-3 gap-3">
                    <Form.Group className="mb-2" controlId="formGroupUsername">
                        <Form.Label style={{color: "white"}}>Username</Form.Label>
                        <Form.Control type="username" placeholder="Enter username" name="username" onChange={this.onChange} />
                    </Form.Group>
                    <Form.Group className="mb-2" controlId="formGroupEmail">
                        <Form.Label style={{color: "white"}}>Email</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" name="username" onChange={this.onChange}/>
                    </Form.Group>
                    <Form.Group className="mb-2" controlId="formGroupPassword">
                        <Form.Label style={{color: "white"}}>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" name="password" onChange={this.onChange} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupPasswordRepeat">
                        <Form.Label style={{color: "white"}}>Repeat Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" name="password2" onChange={this.onChange} />
                    </Form.Group>
                    {this.state.pwdError && (
                        <p style={{color: '#FFCCCB'}}>Passwords do not match.</p>
                    )}
                    {this.props.registrationError && (
                        <p style={{color: '#FFCCCB'}}>Error registering.</p>
                    )}
                    <Link>
                        <Button variant="outline-light" type="submit" onClick={this.onSubmit}>
                            Register
                        </Button>
                    </Link>
                    <br />
                    <p className="mt-2" style={{color: "black"}}>Already have an account? <Link style={{color: "white"}} onClick= {() => this.props.switchView("Login")}><b> Login here.</b></Link></p>
                </Form>
            </Card>
        )
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    registrationError: state.auth.registrationError
})

export default connect(mapStateToProps, { register })(RegisterView);