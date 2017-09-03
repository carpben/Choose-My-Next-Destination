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
            locationToPresent: "",
            imgURLs:[],
            sweetInnCities : ["BARCELONA", "BRUSSELS", "JERUSALEM", "LISBON", "ROME", "TEL AVIV"],
        }
    }
    changeLocationToPresent = (newLocation) => {
        console.log('destination changed')
        const flickrKey= "f7c143a6865aefe5a377912d751edb5a"

        const AJAXURL=`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${flickrKey}&per_page=10&tags=${newLocation}&extras=url_l&format=json&nojsoncallback=1`
        console.log(`AJAXURL: ${AJAXURL}`)
        fetch(AJAXURL)
            .then(res => res.json())
            .then(data => {
                // console.log(data)
                const imgURLs = data.photos.photo.map( photo => photo.url_l )
                this.setState({imgURLs, locationToPresent:newLocation})
                console.log(imgURLs)
            })
            .catch((error)=>{console.log(error)})
    }
  render() {
    return (
      <div className="App">
          <Header />
          <ControlPanel sweetInnCities={this.state.sweetInnCities} changeLocationToPresent={this.changeLocationToPresent}/>
          <Presentation destination={this.state.locationToPresent} imgURLs={this.state.imgURLs} sweetInnCities={this.state.sweetInnCities}/>
          <Footer />
      </div>
    );
  }
}

export default App;
