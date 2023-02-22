import React, { Component } from "react"
import { Card, Container, ListGroup } from "react-bootstrap";
import { connect } from 'react-redux';

export class MyProfile extends Component {
    static propTypes = {
        
    }
  
    async componentDidMount() {
        console.log(this.props.user);
    }

    render() {
        return (
            <>
                <Card className="bg-success p-3 m-3 mt-3">
                    <Container className="m-2">
                        <div className='d-flex align-items-center justify-content-between m-2'>
                            <h2 style={{color: 'white'}}>My Profile</h2>
                        </div>
                        <ListGroup>
                            <ListGroup.Item>
                                {this.props.user.username}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                {this.props.user.email}
                            </ListGroup.Item>
                        </ListGroup>
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