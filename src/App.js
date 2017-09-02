import React, { Component } from 'react'
import './App.css'

import Header from './_components/Header.js'
import ControlPanel from './_components/ControlPanel.js'
import Presentation from './_components/Presentation.js'
import Footer from './_components/Footer.js'

class App extends Component {
    constructor(props){
        super(props);
        this.state={
            destination: "",
            sweetInnCities : ["BARCELONA", "BRUSSELS", "JERUSALEM", "LISBON", "ROME", "TEL AVIV"],
            imgURLs:[]
        }
    }
    changeDestination = (newDestination) => {
        this.setState({destination:newDestination})
        console.log('destination changed')
        const flickrKey= "f7c143a6865aefe5a377912d751edb5a"
        const AJAXURL="https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=f7c143a6865aefe5a377912d751edb5a&per_page=10&tags=barcelona&extras=url_l&format=json&nojsoncallback=1"

        fetch(AJAXURL)
            .then(res => res.json())
            .then(data => {
                // console.log(data)
                const imgURLs = data.photos.photo.map( photo => photo.url_l )
                this.setState({imgURLs})
                console.log(imgURLs)
            })
            .catch((error)=>{console.log(error)})


    }
  render() {
    return (
      <div className="App">
          <Header />
          <ControlPanel sweetInnCities={this.state.sweetInnCities} changeDestination={this.changeDestination}/>
          <Presentation destination={this.state.destination} sweetInnCities={this.state.sweetInnCities}/>
          <Footer />
      </div>
    );
  }
}

export default App;
