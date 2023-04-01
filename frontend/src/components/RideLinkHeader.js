import React, { Component } from "react";
import {MdDirectionsCarFilled} from 'react-icons/md';
import {Navbar, Container, Nav, Button} from 'react-bootstrap';
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
                <Navbar style={{ fontFamily: 'Secular One, sans-serif'}} bg="dark" className="ml-0 pb-0">
                    <div className="d-flex justify-content-between w-100 pl-3 pr-4">
                        <Navbar.Brand className="ms-auto d-flex mt-2">
                            <MdDirectionsCarFilled color="white" size="30px" className="mr-1" />{' '}
                            <h3 style={{color: "white"}}>RideLink</h3>
                        </Navbar.Brand>
                        <Nav onClick={this.props.logout} className="me-auto" style={{color: 'white'}}>
                            <Nav.Link style={{color: "white"}}><Button variant="outline-primary" className="mb-2">Log out</Button></Nav.Link>
                        </Nav>
                    </div>
                </Navbar>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, { logout })(RideLinkHeader);