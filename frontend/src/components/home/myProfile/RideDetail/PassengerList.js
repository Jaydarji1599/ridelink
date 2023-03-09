import { Component } from "react";
import { ListGroup, Card, Button } from "react-bootstrap";
import { AiOutlineCheck, AiOutlineClose } from 'react-icons/ai';
import { FaUserCircle } from 'react-icons/fa';
import StarRatings from 'react-star-ratings';

export default class PassengerList extends Component {
    render() {
        return(
            <ListGroup>
                <ListGroup.Item as="li" className="bg-dark d-flex justify-content-between">
                    <span style={{color: "white", display: "inline-flex", alignItems: "center"}}>
                        <FaUserCircle color="white" className="mr-2" size={30}/>
                        <h6 className="text-white">Jim</h6>
                    </span>
                    <StarRatings 
                            rating={4.8}
                            starRatedColor="gold"
                            starDimension="15px"
                            starSpacing="2px"
                        />
                    <div>
                        <Button variant="success" size="md" disabled>
                        Confirmed
                        </Button>
                    </div>
                </ListGroup.Item>
                <ListGroup.Item as="li" className="bg-dark d-flex justify-content-between">
                    <span style={{color: "white", display: "inline-flex", alignItems: "center"}}>
                        <FaUserCircle color="white" className="mr-2" size={30}/>
                        <h6 className="text-white">Jim</h6>
                    </span>
                    <StarRatings 
                            rating={3.1}
                            starRatedColor="gold"
                            starDimension="15px"
                            starSpacing="2px"
                        />
                    <div>
                        <Button variant="success" size="md" className="mr-2">
                        <AiOutlineCheck />
                        </Button>
                        <Button variant="danger" size="md">
                        <AiOutlineClose />
                        </Button>
                    </div>
                </ListGroup.Item>
            </ListGroup>
        )
    }
}