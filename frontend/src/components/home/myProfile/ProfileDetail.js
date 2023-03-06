import { Component } from "react";
import { Button } from 'react-bootstrap';
import { FaUserCircle } from 'react-icons/fa';

export default class ProfileDetail extends Component {
    render() {
        return (
            <>
                <h4 style={{color: "white"}}>My Profile</h4>
                <div style={{color: "white"}} className="justify-content-between text-center m-2 text-color-white">
                    <FaUserCircle color="white" size={100} />
                    <h6>{this.props.user.username}</h6>
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