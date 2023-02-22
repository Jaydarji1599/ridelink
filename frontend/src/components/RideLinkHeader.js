import React, { Component } from "react";
import {MdDirectionsCarFilled} from 'react-icons/md';
import {Navbar, Container, Nav} from 'react-bootstrap';
import { connect } from 'react-redux';
import { PropTypes } from "prop-types";
import { logout } from "../actions/auth";

export class RideLinkHeader extends Component {
    static propTypes = {
        auth: PropTypes.object.isRequired,
        logout: PropTypes.func.isRequired
    }
    render () {
        

        return (
                <Navbar bg="dark" variant="dark">
                    <Container>
                    <Navbar.Brand>
                        <MdDirectionsCarFilled />{' '}
                        RideLink
                    </Navbar.Brand>
                    <Nav onClick={this.props.logout} className="me-auto" style={{color: 'white'}}>
                        <Nav.Link>Log out</Nav.Link>
                    </Nav>
                    </Container>
                </Navbar>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, { logout })(RideLinkHeader);