import { Component } from "react";
import { ListGroup, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { BsArrowRightCircle } from 'react-icons/bs';
import axios from "axios";
import { FaUserCircle } from "react-icons/fa";
import ProfileModal from "../../availableRides/ProfileModal";

export default class PassengerRideDetail extends Component {
    state = {
        ride: {},
        driver: {},
        isLoading: true
    }
    async componentDidMount() {
        axios.get(`/api/ridelist/${this.props.passenger.ride}/`)
        .then((res) => {
            this.setState({ride: res.data});
            this.setState({isLoading: false});
    
        });
    }

    render() {
        if (this.state.isLoading) {
            return <h6 style={{color: "white"}}>Loading... </h6>
        }
        else {
            return (
                <>
                    <ListGroup.Item as="li" className="bg-dark d-flex justify-content-between mb-2">
                    <div className="stack-2 align-items-center justify-content-center">
                        <h6 style={{color: "white"}}>Driver: </h6>
                        <ProfileModal driver={this.state.ride.driver} />
                    </div>
                    <div className="stack-2">
                        <h6 style={{color: "white"}}>{this.state.ride.source} <BsArrowRightCircle /> {this.state.ride.destination}</h6>
                        <Card.Subtitle className="mb-2 text-muted">{this.state.ride.date}, {this.state.ride.time} </Card.Subtitle>
                    </div>
                    <div>
                        <Button variant="danger" size="md" name={this.props.passenger.id} onClick={this.props.onDelete}>
                        Cancel
                        </Button>
                    </div>
                    </ListGroup.Item>
                </>
            )
        }
    }
}
