import React, { Component } from 'react';
import { Modal, Button, ListGroup, Container, ListGroupItem } from 'react-bootstrap';
import { CgProfile } from 'react-icons/cg';
import { Link } from 'react-router-dom';
import axios from "axios";
import { IoIosStar } from 'react-icons/io';
import ReactStars from "react-rating-stars-component";
import { connect } from 'react-redux';
import { addRating } from '../../../actions/auth';


export class ProfileModal extends Component {
    state = {
        show: false,
        user: {},
        ratingButtonDisable: true,
        ratingButtonText: "Leave Rating",
        curRating: 0
    }

    handleClose = () => {
        this.setState({show: false});
    }
    handleShow = () => this.setState({show: true})

    handleRating = (newRating) => {
        if (this.props.ratingCompleted == false) {
            this.setState({ratingButtonDisable: false});
        }
        this.setState({curRating: newRating})
    };
    submitRating = () => {
        const driverId = this.props.driver;
        const ratingFormatted = {
            driver: driverId,
            reviewer: this.props.curUser,
            score: this.state.curRating,
        }
        console.log(ratingFormatted)
        this.props.addRating(ratingFormatted);
        this.setState(
            {
                ratingButtonDisable: true,
                ratingButtonText: "Rating Submitted!"
            }
        )
    };

    componentDidMount() {
        axios.get(`/api/getuser/${this.props.driver}/`)
        .then((res) => {
            this.setState({user: res.data});
        })

        if (this.props.ratingCompleted) {
            this.setState({
                ratingButtonText: "You already rated this user."
            })
        }
    };
    render() {
        const ratingCompleted = this.props.ratingCompleted;
        let stars;
        if (ratingCompleted) {
            stars = <></>
        }
        else {
            stars = <ReactStars
            count={5}
            onChange={this.handleRating}
            size={24}
            />
        }
        return (
            <>
                <Link onClick={this.handleShow}>
                    <span style={{display: 'flex', alignItems: 'center'}}>
                        <CgProfile />
                        {this.state.user.first_name} 
                        <IoIosStar className="ml-1" />
                        {
                            (this.props.numRatings === 0)
                            ? <>No ratings.</>
                            : <>this.props.rating</>
                        }
                    </span>
                </Link>
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header>
                        <Modal.Title>User Info:</Modal.Title>
                        <Button variant="light" onClick={this.handleClose} className="btn-close">
                            <span aria-hidden="true">&times;</span>
                        </Button>
                    </Modal.Header>
                    <Modal.Body>
                        <ListGroup>
                            <ListGroup.Item>
                                Username: {'  ' + this.state.user.username}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                Email: {'  ' + this.state.user.email}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                First Name: {'  ' + this.state.user.first_name}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                Last Name: {'  ' + this.state.user.last_name}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                Date joined: {'  ' + processDate(this.state.user.date_joined)}
                            </ListGroup.Item>
                            <ListGroupItem>
                                Rating: 
                                {
                                    (this.props.numRatings === 0)
                                    ? <>{' '} No ratings.</>
                                    : <>{this.props.rating} from {this.props.numRatings} ratings.</>
                                }
                            </ListGroupItem>
                        </ListGroup>
                        <h6>Rate User: </h6>
                        <span className="align-items-center p-2 m-2" style={{display: "flex"}}>
                            {stars}
                            <Button disabled={this.state.ratingButtonDisable} onClick={this.submitRating} variant="success" className="ml-2">
                                {this.state.ratingButtonText}
                            </Button>
                        </span>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        )
    }
}

function processDate(datestring) {
    var date = new Date(datestring);
    return (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear();
}
function average(arr) { 
    return (arr.reduce( ( p, c ) => p + c, 0 ) / arr.length).toFixed(1);
};

function checkIfReviewed(arr, curID) {
    if (arr.filter((r) => r.reviewer == curID).length > 0) {
        return true;
    }
    else {
        return false;
    }
}

function mapStateToProps(state, ownProps) {
    const ratingList = state.auth.ratings.filter((r) => r.driver == ownProps.driver)
    return {
        rating: average(ratingList.map(r => r.score)),
        ratingCompleted: checkIfReviewed(ratingList, ownProps.curUser),
        numRatings: ratingList.length
    }
};

export default connect(mapStateToProps, { addRating })(ProfileModal);