import { Component } from "react";
import { ListGroup } from "react-bootstrap";
import PassengerDetail from "./PassengerDetail";
import { connect } from "react-redux";
import { MapStateToProps } from "react-redux";
import { removePassenger } from "../../../../actions/rides";
import axios from "axios";

export class PassengerList extends Component {

    renderItems = () => {
        return this.props.passengers.filter(p => p.ride === this.props.ride.id).map(item => (
            <PassengerDetail ride={this.props.ride} passenger={item} curUser={this.props.user.id} />
        ));
    }

    render() {
        return (
            <>
                <ListGroup>
                    {this.renderItems()}
                </ListGroup>
            </>
        )
    }
}


const mapStateToProps = state => ({
    passengers: state.rides.passengers,
    user: state.auth.user
})


export default connect(mapStateToProps, { removePassenger })(PassengerList);