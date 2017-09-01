import React, { Component } from 'react';
import globeLogo from './globe.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
          <Header />
          <Controller />
      </div>
    );
  }
}

function Header(){
    return (
        <div className="App-header">
            <img src={globeLogo} className="App-logo" alt="logo" />
          <h2>Choose My Next Destination</h2>
        </div>
    )
}

class Controller extends Component {
  render() {
    return (
        <p className="App-intro">
          Peace <code>src/App.js</code> and save to reload.
        </p>
    );
  }
}

export default App;
