import { Component } from "react";
import { Button, Stack } from 'react-bootstrap';
import { FaUserCircle } from 'react-icons/fa';
import StarRatings from 'react-star-ratings';
import { Link } from 'react-router-dom';

export default class ProfileDetail extends Component {
    state = {
        rating: 4.32,
        numReviews: 4
    }
    render() {
        return (
            <>
                <h4 style={{color: "white"}}>My Profile</h4>
                <div style={{color: "white"}} className="justify-content-between text-center m-2 text-color-white">
                    <FaUserCircle color="white" size={100} />
                    <p />
                    <h6>{this.props.user.username}</h6>             
                    <StarRatings 
                        rating={this.state.rating}
                        starRatedColor="gold"
                        starDimension="20px"
                        starSpacing="2px"
                    />
                    <p />
                    <p>{this.state.numReviews} reviews</p>
                    <p>Date joined: {'  ' + processDate(this.props.user.date_joined)}</p>
                    <Button variant="success" onClick={this.props.switch}>Edit Info</Button>
                </div>
            </>
        )
    }
}

function processDate(datestring) {
    var date = new Date(datestring);
    return (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear();
}