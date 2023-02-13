import React, { Component } from "react";
import Main from "./components/main";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rideList: []
      };
      
  }

    render() {
      return (
        <div className="App">
          <Main />
        </div>
      )
    }
  }
  
export default App;