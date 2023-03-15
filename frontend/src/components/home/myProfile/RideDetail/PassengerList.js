import { Component } from "react";
import { ListGroup } from "react-bootstrap";
import PassengerDetail from "./PassengerDetail";
import { connect } from "react-redux";
import { MapStateToProps } from "react-redux";
import { removePassenger } from "../../../../actions/rides";

export class PassengerList extends Component {

    onDelete = (id) => {
        this.props.removePassenger(id);
    }

    renderItems = () => {
        console.log(this.props.passengers);
        return this.props.passengers.filter(p => p.ride === this.props.ride.id).map(item => (
            <PassengerDetail ride={this.props.ride} passenger={item} onDelete={this.onDelete} />
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
    passengers: state.rides.passengers
})


export default connect(mapStateToProps, { removePassenger })(PassengerList);