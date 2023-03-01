import React, { Component } from "react";
import { Card, Button, Form } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from "../../actions/auth";


class LoginView extends Component {
    state = {
        username: '',
        password: ''
    }
    static propTypes = {
        login: PropTypes.func.isRequired,
        isAuthenticated: PropTypes.bool,
        loginError: PropTypes.bool
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.props.login(this.state.username, this.state.password);
    };

    onChange = (e) => {this.setState({ [e.target.name]: e.target.value })};

    render() {
        if (this.props.isAuthenticated) {
            return <Navigate to="/" />
        }
        return (
            <Card className="bg-success m-3 p-2" style={{width: "350px"}}>
                <Form className="p-3 m-3 gap-3">
                <Form.Group className="mb-3" controlId="formGroupEmail">
                    <Form.Label style={{color: "white"}}>Username</Form.Label>
                    <Form.Control type="username" placeholder="Enter username" name="username" onChange={this.onChange} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGroupPassword">
                    <Form.Label style={{color: "white"}}>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" name="password"  onChange={this.onChange} />
                </Form.Group>
                {this.props.loginError && (
                    <p style={{color: '#FFCCCB'}}>Wrong username or password entered. Please try again.</p>
                )}
                <Link>
                    <Button variant="outline-light" type="submit" onClick={this.onSubmit}>
                        Sign in
                    </Button>
                </Link>
                <br />
                <p className="mt-2" style={{color: "black"}}>New around here? <Link style={{color: "white"}} onClick= {() => this.props.switchView("Signup")}><b> Register now!</b></Link></p>
                </Form>
            </Card>
        )
    }
}


const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    loginError: state.auth.loginError
})

export default connect(mapStateToProps, { login })(LoginView);