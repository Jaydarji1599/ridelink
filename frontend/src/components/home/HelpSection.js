import React, { Component } from "react"
import { Card, Container, Row, Col, Form, Button } from "react-bootstrap";
import Accordion from 'react-bootstrap/Accordion';
import { connect } from 'react-redux';

export class MyProfile extends Component {
    static propTypes = {
        
    }

    render() {
        return (
            <>
                <Card className="bg-success p-3 m-3 mt-3">
                    <Container className="m-2">
                        <div className='d-flex align-items-center justify-content-between m-2'>
                            <h2 style={{color: 'white'}}>Help</h2>
                        </div>
                        <Row>
                            <Col>
                            <h4>FAQ:</h4>
                            <Accordion>
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header>How do I book a ride?</Accordion.Header>
                                    <Accordion.Body>
                                    When you find the ride you like, click book and you will be prompted to call the driver.
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="1">
                                    <Accordion.Header>How do I remove a ride I posted?</Accordion.Header>
                                    <Accordion.Body>
                                    Simply navigate to the "My Profile" page and under "My Rides" click the delete button of the corrosponding ride.
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="2">
                                    <Accordion.Header>Who made RideLink?</Accordion.Header>
                                    <Accordion.Body>
                                    4 computer science students at StFX!
                                    </Accordion.Body>
                                </Accordion.Item>
                                </Accordion>

                            </Col>
                            <Col>
                            <h4>Contact us:</h4>
                            <Form>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control type="email" placeholder="name@example.com" />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                    <Form.Label>Your question</Form.Label>
                                    <Form.Control as="textarea" rows={3} />
                                </Form.Group>
                                <Button variant="outline-light">Submit</Button>
                            </Form>
                            </Col>
                        </Row>
                    </Container>
                </Card>
            </>
        )
    }
}

const mapStateToProps = state => ({
    user: state.auth.user
})
    
export default connect(mapStateToProps)(MyProfile);