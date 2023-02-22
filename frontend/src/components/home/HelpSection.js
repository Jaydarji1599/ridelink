import React, { Component } from "react"
import { Card, Container } from "react-bootstrap";
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
                        <p>
                            Example help section content.
                        </p>
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