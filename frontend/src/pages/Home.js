import React, { Component } from "react"
import { Button, Card } from "react-bootstrap";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rideList: []
      };
      
  }

    async componentDidMount() {
      const res = await fetch('http://localhost:8000/api/ridelist/');
      const rideList = await res.json();
      this.setState({
        rideList
      })
    }

    renderItems = () => {

      return this.state.rideList.map(item => (
        <tr>
          <th scope="row">{item.id}</th>
          <td>{item.source}</td>
          <td>{item.destination}</td>
          <td>{item.date}</td>
          <td>{item.time}</td>
          <td>{item.phone}</td>
        </tr>
      ));
    };

    render() {
      return (
        <main className="content">
          <Card className="bg-dark">
            <h3 style={{textAlign: "center", color: "white"}}>Available Rides: </h3>
            <div className="row">
              <table class="table table-dark p-3">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Source</th>
                  <th scope="col">Destination</th>
                  <th scope="col">Date</th>
                  <th scope="col">Time</th>
                  <th scope="col">Contact</th>
                </tr>
                <tbody>
                  {this.renderItems()}
                </tbody>
              </table>
            </div>
          </Card>
        </main>
      )
    }
  }
  
export default Home;