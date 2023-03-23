import { Component } from "react";
import { ListGroup, Card, Button } from "react-bootstrap";
import { BsArrowRightCircle } from 'react-icons/bs';
import { FaUserCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import { MapStateToProps } from "react-redux";
import { removePassenger } from "../../../actions/rides";
import PassengerRideDetail from "./PassengerList/PassengerRideDetail";

export class PassengerRideList extends Component {

    onDelete = (passengerid, ride) => {
        this.props.removePassenger(passengerid, ride, this.props.user.first_name, "passenger");
    }
    renderItems = () => {
        return this.props.passengers.map(item => (
            <PassengerRideDetail passenger={item} name={item.id} onDelete={this.onDelete} curUser={this.props.user.id} />
        ));
    }

    render() {
        return (
            <ListGroup>
                {this.renderItems()}
            </ListGroup>
        )
    }
}

const mapStateToProps = state => ({
    user: state.auth.user,
    passengers: state.rides.passengers.filter(p => p.user === state.auth.user.id)
});

export default connect(mapStateToProps, { removePassenger })(PassengerRideList);