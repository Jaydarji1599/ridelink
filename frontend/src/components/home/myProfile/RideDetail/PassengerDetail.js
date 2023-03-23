import { Component } from "react";
import { ListGroup, Button } from "react-bootstrap";
import { AiOutlineCheck, AiOutlineClose } from 'react-icons/ai';
import { FaUserCircle } from 'react-icons/fa';
import StarRatings from 'react-star-ratings';
import axios from "axios";
import ProfileModal from "../../availableRides/ProfileModal";
import { removePassenger } from "../../../../actions/rides";
import { connect } from "react-redux";

class PassengerDetail extends Component {

    componentDidMount() {
        axios.get(`/api/getuser/${this.props.passenger.user}/`)
        .then((res) => {
            this.setState({user: res.data});
        })
    }
    
    onDelete = (passenger, ride) => {
        axios.get(`/api/getuser/${passenger.user}/`)
        .then((res) => {  
            this.props.removePassenger(passenger.id, ride, res.data.first_name, "driver");
        })
        .catch((err) => {
            console.log(err);
        })
    }

    render() {
        return (
            <>
                <ListGroup.Item as="li" className="bg-dark d-flex justify-content-between">
                    <ProfileModal driver={this.props.passenger.user} curUser={this.props.curUser} />
                    <div>
                        <Button variant="danger" size="md" onClick={() => this.onDelete(this.props.passenger, this.props.ride)}>
                        Remove
                        </Button>
                    </div>
                </ListGroup.Item>
            </>
        )
    }
};
export default connect(null, { removePassenger })(PassengerDetail);