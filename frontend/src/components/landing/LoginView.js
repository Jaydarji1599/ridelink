import React, { Component } from "react";
import { Card, Button, Form, Spinner } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from "../../actions/auth";


class LoginView extends Component {
    state = {
        username: '',
        password: '',
        loading: false
    }
    static propTypes = {
        login: PropTypes.func.isRequired,
        isAuthenticated: PropTypes.bool,
        loginError: PropTypes.bool
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.setState({loading: true});
        setTimeout(() => {
            this.setState({loading: false});
            this.props.login(this.state.username, this.state.password);
        }, 1000);
    };

    onChange = (e) => {this.setState({ [e.target.name]: e.target.value })};

    render() {
        if (this.props.isAuthenticated) {
            return <Navigate to="/" />
        }
        return (
            <Card className="bg-primary m-3 p-2" style={{width: "350px"}}>
                <Form className="p-3 m-3 gap-3">
                <Form.Group className="mb-3" controlId="formGroupEmail" controlId="validationCustom01">
                    <Form.Label style={{color: "#2e2e2e"}}>Username</Form.Label>
                    <Form.Control required type="username" placeholder="Enter username" name="username" onChange={this.onChange} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGroupPassword" controlId="validationCustom02">
                    <Form.Label style={{color: "#2e2e2e"}}>Password</Form.Label>
                    <Form.Control required type="password" placeholder="Password" name="password"  onChange={this.onChange} />
                </Form.Group>
                {this.props.loginError && (
                    <p style={{color: 'red'}}>Wrong username or password entered. Please try again.</p>
                )}
                <Link>
                    <Button variant="success" type="submit" onClick={this.onSubmit}>
                    {this.state.loading? <Spinner animation="border" size="sm" /> : 'Login'}
                    </Button>
                </Link>
                <br />
                <p className="mt-2" style={{color: "black"}}>New around here? <Link style={{color: "white"}} onClick= {() => this.props.switchView("Signup")}>Register now!</Link></p>
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