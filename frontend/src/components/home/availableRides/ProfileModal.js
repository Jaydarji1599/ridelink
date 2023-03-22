import React, { useState, useEffect } from 'react';
import { Modal, Button, ListGroup, Container } from 'react-bootstrap';
import { CgProfile } from 'react-icons/cg';
import { Link } from 'react-router-dom';
import axios from "axios";
import { IoIosStar } from 'react-icons/io';
import ReactStars from "react-rating-stars-component";

export default function ProfileModal({driver}) {
    const [show, setShow] = useState(false);

    const [user, setUser] = useState({});

    const [rating, setRating] = useState(0);
    const [ratingButton, setRatingButton] = useState(true);
    const [ratingButtonText, setRatingButtonText] = useState("Leave Review");

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleRating = (newRating) => {
        setRating(newRating);
        setRatingButton(false);
    };
    const submitRating = () => {
        setRatingButton(true);
        setRatingButtonText("Review Submitted!")
    };

    useEffect(() => {
        axios.get(`/api/getuser/${driver}/`)
        .then((res) => {
            const user = res.data;
            setUser(user);
        })
    }, []);

    return (
        <>
            <Link onClick={handleShow}> <span style={{display: 'flex', alignItems: 'center'}}><CgProfile /> {user.first_name} <IoIosStar className="ml-1" /> {rating} </span></Link>
            <Modal show={show} onHide={handleClose} style={{ fontFamily: 'Secular One, sans-serif' }}>
            <Modal.Header>
                <Modal.Title>User Info:</Modal.Title>
                <Button variant="light" onClick={handleClose} className="btn-close">
                    <span aria-hidden="true">&times;</span>
                </Button>
            </Modal.Header>
            <Modal.Body>
                <ListGroup>
                    <ListGroup.Item>
                        Username: {'  ' + user.username}
                    </ListGroup.Item>
                    <ListGroup.Item>
                        Email: {'  ' + user.email}
                    </ListGroup.Item>
                    <ListGroup.Item>
                        First Name: {'  ' + user.first_name}
                    </ListGroup.Item>
                    <ListGroup.Item>
                        Last Name: {'  ' + user.last_name}
                    </ListGroup.Item>
                    <ListGroup.Item>
                        Date joined: {'  ' + processDate(user.date_joined)}
                    </ListGroup.Item>
                </ListGroup>
                <span className="align-items-center p-2 m-2" style={{display: "flex"}}>
                    <ReactStars
                        count={5}
                        onChange={handleRating}
                        size={24}
                        disabled={true}
                        />
                    <Button disabled={ratingButton} onClick={submitRating} variant="success" className="ml-2">
                        {ratingButtonText}
                    </Button>
                </span>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
            </Modal>
        </>
    )
}

function processDate(datestring) {
    var date = new Date(datestring);
    return (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear();
}