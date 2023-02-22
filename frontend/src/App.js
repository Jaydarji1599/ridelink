import React, { Component } from "react";
import Main from "./components/main";
import store from "./store";
import { loadUser } from "./actions/auth";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rideList: []
      };
      
  }
    componentDidMount() {
      store.dispatch(loadUser());
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