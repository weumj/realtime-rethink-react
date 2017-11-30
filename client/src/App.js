import React, { Component } from 'react';
import './App.css';
import { subscribeToTimer } from "./api";

class App extends Component {
  state = {
    timeStamp: "no timestamp yet",
  };

  constructor(props) {
    super(props);

    subscribeToTimer()
      .then(timeStamp => this.setState({
        timeStamp,
      }));
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Our awesome drawing app</h2>
        </div>
        This is the value of the timer timestamp: {this.state.timeStamp}
      </div>
    );
  }
}

export default App;
