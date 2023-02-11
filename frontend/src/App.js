import React, { Component } from "react"

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rideList: []
      };
      
  }

    async componentDidMount() {
      const res = await fetch('http://localhost:8000/api/ridelist/');
      const rideList = await res.json();
      console.log(rideList);
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
          <td>i{item.time}</td>
        </tr>
      ));
    };

    render() {
      return (
        <main className="content">
          <div className="row">
            <table class="table table-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Source</th>
                <th scope="col">Destination</th>
                <th scope="col">Date</th>
                <th scope="col">Time</th>
              </tr>
              <tbody>
                {this.renderItems()}
              </tbody>
            </table>
          </div>
        </main>
      )
    }
  }
  
export default App;