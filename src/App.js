import React, { Component } from 'react'
import './App.css'

import Header from './_components/Header.js'
import Controller from './_components/Controller.js'
import Presentation from './_components/Presentation.js'
import Footer from './_components/Footer.js'

class App extends Component {
    constructor(props){
        super(props);
        this.state={
            destination: "",
            sweetInnCities : ["BARCELONA", "BRUSSELS", "JERUSALEM", "LISBON", "ROME", "TEL AVIV"],
        }
    }
    changeDestination = (newDestination) => {
        this.setState({destination:newDestination})
        console.log('destination changed')
    }
  render() {
    return (
      <div className="App">
          <Header />
          <Controller sweetInnCities={this.state.sweetInnCities} changeDestination={this.changeDestination}/>
          <Presentation destination={this.state.destination} sweetInnCities={this.state.sweetInnCities}/>
          <Footer />
      </div>
    );
  }
}

export default App;
