import React, { Component } from "react"
import { Card, Container, Row, Col, Button } from "react-bootstrap";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getRides, filterRides } from '../../actions/rides';
import { BsArrowRightCircle, BsSearch, BsPlusCircle } from 'react-icons/bs';
import AddModal from "./rideSection/AddModal";
import SearchModal from "./rideSection/SearchModal";
import ProfileModal from "./rideSection/ProfileModal";
import { ThemeConsumer } from "react-bootstrap/esm/ThemeProvider";

export class AvailableRides extends Component {

    constructor(props) {
      super(props);
      this.state = {
        showSearchModal: false,
        showAddModal: false,
      }
    }

    static propTypes = {
        rides: PropTypes.array.isRequired
    }
  
    async componentDidMount() {
        this.props.getRides();
        console.log(this.props.rides);
    }
      

      // control modal functions
      openSearchModal = () => this.setState({showSearchModal: true});
      closeSearchModal = () => this.setState({showSearchModal: false});
      openAddModal = () => this.setState({showAddModal: true});
      closeAddModal = () => this.setState({showAddModal: false});

      renderItems = () => {
        return this.props.rides.map(item => (
            <Col>
              <Card key={item.id} bg="dark" text="white" className="mb-2">
                <Card.Header>{item.source} <BsArrowRightCircle /> {item.destination}</Card.Header>
                <Card.Body>
                  <Card.Subtitle className="mb-2 text-muted">{item.date}, {item.time}</Card.Subtitle>
                  <Card.Text>
                    <ProfileModal ride={item} />
                  </Card.Text>
                  <Button variant="outline-success" className="btn-block" size="md" onClick={() => window.location.href = `tel:${item.phone}`}>
                    Book
                  </Button>
                </Card.Body>
              </Card>
            </Col>
        ));
      };

      render() {
        return (
            <>
                <Card className="bg-success p-3 m-3 mt-3">
                    <Container className="m-2">
                        <div className='d-flex align-items-center justify-content-between m-2'>
                            <h2 style={{color: 'white'}}>Available Rides:</h2>
                            <div>
                              <Button variant="dark my-auto mr-2" onClick={this.openAddModal}><b>New ride</b> <BsPlusCircle className="ml-2 mt-2 mb-2" /></Button>
                              <Button variant="outline-light my-auto" onClick={this.openSearchModal}><b>Search</b> <BsSearch className="m-2" /></Button>
                            </div>
                        </div>
                        <Row xs={1} md={4}>
                            {this.renderItems()}
                        </Row>
                    </Container>
                </Card>

                <AddModal show={this.state.showAddModal} close={this.closeAddModal} />
                <SearchModal show={this.state.showSearchModal} close={this.closeSearchModal} />
            </>
        )
      }
}

const mapStateToProps = state => ({
    rides: state.rides.filteredRides
})
    
export default connect(mapStateToProps, {getRides, filterRides})(AvailableRides);