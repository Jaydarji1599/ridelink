import { Component } from "react";
import { Button, Stack } from 'react-bootstrap';
import { FaUserCircle } from 'react-icons/fa';
import StarRatings from 'react-star-ratings';
import { connect } from "react-redux";
import { MapStateToProps } from "react-redux";
import { IoIosStar } from "react-icons/io";
import StarsRating from 'stars-rating'

export class ProfileDetail extends Component {

    render() {
        return (
            <>
                <h4 style={{color: "white"}}>My Profile</h4>
                <div style={{color: "white"}} className="justify-content-between text-center m-2 text-color-white">
                    <FaUserCircle color="white" size={100} />
                    <p />
                    <h6>{this.props.user.username}</h6>      
                    {
                        (this.props.numRatings === 0)
                        ? <p>No ratings yet!</p>
                        : <p>{this.props.rating}<IoIosStar color="gold" className="ml-1" /> from {this.props.numRatings} ratings</p>
                    }
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
};
function average(arr) { 
    return Number((arr.reduce( ( p, c ) => p + c, 0 ) / arr.length).toFixed(1));
};

function mapStateToProps(state, ownProps) {
    const ratingList = state.auth.ratings.filter((r) => r.driver == ownProps.user.id);
    return {
        rating: average(ratingList.map(r => r.score)),
        numRatings: ratingList.length
    }
}

export default connect(mapStateToProps)(ProfileDetail);