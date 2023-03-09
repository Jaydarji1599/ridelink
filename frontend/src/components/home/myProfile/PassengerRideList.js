import { Component } from "react";
import { ListGroup, Card, Button } from "react-bootstrap";
import { BsArrowRightCircle } from 'react-icons/bs';
import { FaUserCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default class PassengerRideList extends Component {
    render() {
        return (
            <ListGroup>
                <ListGroup.Item as="li" className="bg-dark d-flex justify-content-between mb-2">
                    <Link className="mt-2">
                        <span style={{display: "inline-flex", alignItems: "center"}}>
                            <FaUserCircle className="mr-2 ml-2" size={25}/>
                            <h6>Jim</h6>
                        </span>
                    </Link>
                    <div className="stack-2">
                        <h6 style={{color: "white"}}>HALIFAX <BsArrowRightCircle /> MONCTION</h6>
                        <Card.Subtitle className="mb-2 text-muted">2023-03-20, 12:00:00</Card.Subtitle>
                    </div>
                    <div>
                        <Button variant="danger" size="md">
                        Cancel
                        </Button>
                    </div>
                </ListGroup.Item>
            </ListGroup>
        )
    }
}