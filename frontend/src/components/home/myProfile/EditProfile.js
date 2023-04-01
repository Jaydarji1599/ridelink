import { Component } from "react";
import { Button, Container, Form, Spinner } from 'react-bootstrap';
import { connect } from 'react-redux';
import { updateProfile } from "../../../actions/auth";
import { MapStateToProps } from "react-redux";
import {Formik} from 'formik';
import * as Yup from 'yup';
import axios from "axios";


const getSchema = ({username, email}) => Yup.object().shape({
    username: Yup.string()
    .min(6, "Username must be at least 6 characters.")
    .test('username-exists', 'Username is already taken.', async function(value){
        if (value === username) {
            return true;
        }
        const response = await axios.get(`/api/getuser/?username=${value}`);
        return !response.data.length > 0;
    }),
    email: Yup.string()
    .email('Invalid email.')
    .test('email-exists', 'Email is already in use.', async function(value) {
        if (value === email) {
            return true;
        }
        const response = await axios.get(`/api/getuser/?email=${value}`);
        return !response.data.length > 0;
    }),
    firstName: Yup.string(),
    lastName: Yup.string(),
});

class EditProfile extends Component {

    state = {
        isLoading: false
    }
    onSubmit = (values) => {
        this.setState({isLoading: true});
        this.props.updateProfile({
            username: values.username,
            email: values.email,
            firstName: values.firstName,
            lastName: values.lastName,
            pk: this.props.user.id
        });
        setTimeout( () => {
            this.props.switch();
        }, 1000);
    };

    onClose = (e) => {
        this.props.switch();
    };

    onChange = (e) => {this.setState({ [e.target.name]: e.target.value })};

    render() {
        const schema = getSchema({
            username: this.props.user.username,
            email: this.props.user.email
        })
        return (
            <>
                <h4 style={{color: "white"}}>Edit Profile</h4>
                <Container className="p-1">
                    <Formik 
                        validationSchema={schema}
                        validateOnChange={false}
                        onSubmit={this.onSubmit}
                        initialValues={{
                            username: this.props.user.username,
                            firstName: this.props.user.first_name,
                            lastName: this.props.user.last_name,
                            email: this.props.user.email,
                        }}

                    > 
                        {({
                            handleSubmit,
                            handleChange,
                            values,
                            errors,
                            initialValues
                        }) => (
                            <Form noValidate onSubmit={handleSubmit} className="p-3 m-3 gap-3">
                                <Form.Group className="mb-2" controlId="validationFormik01">
                                    <Form.Control 
                                    type="username" 
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
                                        name="email" 
                                        onChange={handleChange}
                                        value={values.email}
                                        isInvalid={errors.email}
                                    />
                                    <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="mb-2" controlId="validationFormik04">
                                    <Form.Control 
                                        type="name" 
                                        name="firstName"
                                        onChange={handleChange}
                                        value={values.firstName}
                                        isInvalid={errors.firstName}
                                    />
                                    <Form.Control.Feedback type="invalid">{errors.firstName}</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="mb-2" controlId="validationFormik05">
                                    <Form.Control 
                                        type="name"  
                                        name="lastName" 
                                        onChange={handleChange}
                                        value={values.lastName}
                                        isInvalid={errors.lastName}
                                    />
                                    <Form.Control.Feedback type="invalid">{errors.lastName}</Form.Control.Feedback>
                                </Form.Group>
                                <Button className="m-1" variant="primary" name="submit" type="submit">
                                {this.state.isLoading? <Spinner animation="border" size="sm" /> : 'Save'}
                                </Button>
                                <Button className="m=1" variant="secondary" name="close" onClick={this.onClose}>Cancel</Button>
                                <br />
                            </Form>
                        )}
                    </Formik>
                </Container>
            </>
        )
    }
}

const mapStateToProps = state => ({
    user: state.auth.user
})

export default connect(mapStateToProps, { updateProfile })(EditProfile);