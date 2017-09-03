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
            presentationLoadCycles:1
        }
    }
    updateImgURLs = (Location, imgLimit) => {
        const flickrKey= "f7c143a6865aefe5a377912d751edb5a"
        const AJAXURL=`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${flickrKey}&per_page=65&tags=${Location}&extras=url_l&format=json&nojsoncallback=1`
        console.log(`AJAXURL: ${AJAXURL}`)
        fetch(AJAXURL)
            .then(res => res.json())
            .then(data => {
                // console.log(data)
                let imgURLs = []
                data.photos.photo.forEach( (photo) => {
                    if (photo.width_l==="1024"){
                        imgURLs.push(photo.url_l)
                    }
                })

                // const imgURLs = data.photos.photo.reduce( (accu, photo) => {
                //     if(photo.width_l==1024 && accu.length<10){
                //         accu.push(photo.url_l)
                //     }
                // }, [])
                console.log(imgURLs)

                this.setState({imgURLs, locationToPresent:Location})
            })
            .catch((error)=>{console.log(error)})
    }

    changeLocationToPresent= (newLocation) => {
        console.log('destination changed')
        this.setState({locationToPresent:newLocation, presentationLoadCycles:1})
        this.updateImgURLs(newLocation, 9)
    }
    incrementPresentationLoadCycles = () => {
        this.state.presentationLoadCycles++
        console.log('cycle incremented')
    }

  render() {
    return (
      <div className="App">
          <Header />
          <ControlPanel sweetInnCities={this.state.sweetInnCities} changeLocationToPresent={this.changeLocationToPresent}/>
          <Presentation incrementPresentationLoadCycles={this.incrementPresentationLoadCycles} locationToPresent={this.state.locationToPresent} imgURLs={this.state.imgURLs} sweetInnCities={this.state.sweetInnCities}/>
          <Footer />
      </div>
    );
  }
}

export default App;
