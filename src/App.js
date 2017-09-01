import React, { Component } from 'react'
import './App.css'

import Header from './_components/Header.js'
import Controller from './_components/Controller.js'

class App extends Component {
  render() {
    return (
      <div className="App">
          <Header />
          <Controller />
          {/* <Presentation />
          <Footer /> */}
      </div>
    );
  }
}

export default App;
