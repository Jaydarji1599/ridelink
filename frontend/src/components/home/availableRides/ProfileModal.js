import { useState, useEffect } from 'react';
import { Modal, Button, ListGroup } from 'react-bootstrap';
import { CgProfile } from 'react-icons/cg';
import { Link } from 'react-router-dom';
import axios from "axios";
import { IoIosStar } from 'react-icons/io';

export default function ProfileModal({ride}) {
    const [show, setShow] = useState(false);
    const [user, setUser] = useState({});
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [rating, setRating] = useState(3);
    
    useEffect(() => {
        axios.get(`/api/getuser/${ride.userId}/`)
        .then((res) => {
            const user = res.data;
            setUser(user);
        })
    }, [])

    return (
        <>
            <Link onClick={handleShow}> <span style={{display: 'flex', alignItems: 'center'}}><CgProfile /> {ride.name} <IoIosStar className="ml-1" /> {rating} </span></Link>
            <Modal show={show} onHide={handleClose}>
            <Modal.Header>
                <Modal.Title>Driver Info:</Modal.Title>
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