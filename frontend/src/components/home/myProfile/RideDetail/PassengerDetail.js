import { Component } from "react";
import { ListGroup, Button } from "react-bootstrap";
import { AiOutlineCheck, AiOutlineClose } from 'react-icons/ai';
import { FaUserCircle } from 'react-icons/fa';
import StarRatings from 'react-star-ratings';
import axios from "axios";
import ProfileModal from "../../availableRides/ProfileModal";

export default class PassengerDetail extends Component {
    state = {
        user: {}
    }
    async componentDidMount() {
        axios.get(`/api/getuser/${this.props.passenger.user}/`)
        .then((res) => {
            this.setState({user: res.data});
        })
    }
    
    handleClick = () => {
        this.props.onDelete(this.props.passenger.id);
    }

    render() {
        return (
            <>
                <ListGroup.Item as="li" className="bg-dark d-flex justify-content-between">
                    <ProfileModal driver={this.props.passenger.user} />
                    <div>
                        <Button variant="danger" size="md" onClick={this.handleClick}>
                        Remove
                        </Button>
                    </div>
                </ListGroup.Item>
            </>
        )
    }
}
