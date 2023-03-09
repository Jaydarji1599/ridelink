import { Component } from "react";
import { ListGroup, Button, Container, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import { updateProfile } from "../../../actions/auth";
import { MapStateToProps } from "react-redux";
class EditProfile extends Component {
    state = {
        email: this.props.user.email,
        username: this.props.user.username,
        firstName: this.props.user.first_name,
        lastName: this.props.user.last_name,
        updateError: {
            show: false,
            message: {}
        },
        pk: this.props.user.id
    }

    onSubmit = (e) => {
        e.preventDefault();
        if (e.target.name == "submit") {
            const { username, email, firstName, lastName, pk} = this.state;
            this.props.updateProfile({ username, email, firstName, lastName, pk});
        }
        else {
            const { username, email, firstName, lastName} = this.props.auth.user;
            const pk = this.state.pk
            this.props.updateProfile({ username, email, firstName, lastName, pk});
        }
        
    };

    onClose = (e) => {
        this.setState({
            updateError: {
                show: false,
                message: {}
            }
        })
        this.props.switch();
    };

    onChange = (e) => {this.setState({ [e.target.name]: e.target.value })};

    render() {
        return (
            <>
                <h4 style={{color: "white"}}>Edit Profile</h4>
                <Container className="p-1">
                
                    <Form className="p-3 m-3 gap-3">
                        <Form.Group className="mb-2" controlId="formGroupUsername">
                            <Form.Control type="username" defaultValue={this.props.user.username} name="username" onChange={this.onChange} />
                            {(this.props.updateError.show && "username" in this.props.updateError.message) && (
                            <p style={{color: 'red'}}>{this.props.updateError.message.username}</p>
                            )}
                        </Form.Group>
                        <Form.Group className="mb-2" controlId="formGroupEmail">
                            <Form.Control type="email" defaultValue={this.props.user.email} name="email" onChange={this.onChange}/>
                            {(this.props.updateError.show && "email" in this.props.updateError.message) && (
                            <p style={{color: 'red'}}>{this.props.updateError.message.email.email}</p>
                            )}
                        </Form.Group>
                        <Form.Group className="mb-2" controlId="formGroupFirstName">
                            <Form.Control type="name" defaultValue={this.props.user.first_name} name="firstName" onChange={this.onChange}/>
                        </Form.Group>
                        <Form.Group className="mb-2" controlId="formGroupLastName">
                            <Form.Control type="name" defaultValue={this.props.user.last_name} name="lastName" onChange={this.onChange}/>
                        </Form.Group>
                        <Button className="m-1" variant="success" name="submit" type="submit" onClick={this.onSubmit}>Save</Button>
                        <Button className="m=1" variant="secondary" name="close" onClick={this.onClose}>Close</Button>
                        <br />
                    </Form>
                </Container>
            </>
        )
    }
}

const mapStateToProps = state => ({
    user: state.auth.user,
    updateError: state.auth.updateError
})

export default connect(mapStateToProps, { updateProfile })(EditProfile);