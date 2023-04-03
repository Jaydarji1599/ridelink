import { Component } from "react";
import { ListGroup, Button, Card } from "react-bootstrap";
import { BsArrowRightCircle } from 'react-icons/bs';
import ProfileModal from "../../availableRides/ProfileModal";
import { connect } from "react-redux";


export class PassengerRideDetail extends Component {
    state = {
        ride: {},
        driver: {},
    }

    render() {
        return (
            <>
                <ListGroup.Item as="li" className="bg-dark d-flex justify-content-between mb-2">
                <div className="stack-2 align-items-center justify-content-center">
                    <h6 style={{color: "white"}}>Driver: </h6>
                    <ProfileModal driver={this.props.ride.driver} curUser={this.props.curUser} />
                </div>
                <div className="stack-2">
                    <h6 style={{color: "white"}}>{this.props.ride.source} <BsArrowRightCircle /> {this.props.ride.destination}</h6>
                    <Card.Subtitle className="mb-2 text-muted">{this.props.ride.date}, {this.props.ride.time} </Card.Subtitle>
                </div>
                <div>
                    <Button variant="danger" size="md" name={this.props.passenger.id} onClick={() => this.props.onDelete(this.props.passenger.id, this.props.ride)}>
                    Cancel
                    </Button>
                </div>
                </ListGroup.Item>
            </>
        )
    }
}

function mapStateToProps(state, ownProps) {
    return {
        ride: state.rides.rides.filter((r) => r.id === ownProps.passenger.ride)[0]
    }
}

export default connect(mapStateToProps)(PassengerRideDetail);