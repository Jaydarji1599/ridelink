import React, { Component } from "react"
import { Card, Container, ListGroup, Row, Col, Button, Stack } from "react-bootstrap";
import { BsArrowRightCircle } from 'react-icons/bs';
import { connect } from 'react-redux';
import { deleteRide, getRides } from '../../actions/rides';

export class MyProfile extends Component {
    static propTypes = {
        
    }

    onDelete = (e) => {
        this.props.deleteRide(e.target.name);
    }

    async componentDidMount() {
        this.props.getRides();
    }

    renderItems = () => {
        let filteredRides = this.props.rides.filter(ride => ride.userId === this.props.user.id);
        return filteredRides.map(item => (
            <ListGroup.Item as="li" className="bg-dark d-flex justify-content-between mb-2">
                <div className="stack-2">
                <h6 style={{color: "white"}}>{item.source.toUpperCase()} <BsArrowRightCircle /> {item.destination.toUpperCase()}</h6>
                <Card.Subtitle className="mb-2 text-muted">{item.date}, {item.time}</Card.Subtitle>
                </div>
                <Button variant="danger" name={item.id} onClick={this.onDelete} size="md">
                Delete
                </Button>
            </ListGroup.Item>
        ));
      };

    render() {
        return (
            <>
                <Card className="bg-success p-3 m-3 mt-3">
                    <Container className="m-2">
                        
                        <div className='d-flex align-items-center justify-content-between m-2'>
                            <h2 style={{color: 'white'}}>My Profile</h2>
                        </div>
                        <Row>
                        <Col>
                            <h4>My Info:</h4>
                            <ListGroup>
                                <ListGroup.Item>
                                    Username: {'  ' + this.props.user.username}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    Email: {'  ' + this.props.user.email}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    First Name: {'  ' + this.props.user.first_name}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    Last Name: {'  ' + this.props.user.last_name}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    Date joined: {'  ' + processDate(this.props.user.date_joined)}
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                    
                        <Col>
                            <Stack>
                                <h4>My Rides:</h4>
                                <ListGroup>
                                    {this.renderItems()}
                                </ListGroup>
                            </Stack>
                        </Col>
                        </Row>
                    </Container>
                </Card>
            </>
        )
    }
}

const mapStateToProps = state => ({
    user: state.auth.user,
    rides: state.rides.rides
})

function processDate(datestring) {
    var date = new Date(datestring);
    return (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear();
}

export default connect(mapStateToProps, { deleteRide, getRides })(MyProfile);