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
            presentationLoadCycles:1,
            isLoading:false
        }
    }

    changeLocation= (newLocation) => {
        // Responsible of all changes to the state when a new location is given. Makes AJAX request to Flickr.com.
        this.setState({locationToPresent:newLocation, presentationLoadCycles:1, isLoading:true})

        const flickrKey= "f7c143a6865aefe5a377912d751edb5a"
        const AJAXURL=`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${flickrKey}&per_page=70&tags=${newLocation}&extras=url_l,url_o,url_m&format=json&nojsoncallback=1`
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

                console.log(imgURLs)

                this.setState({imgURLs, isLoading:false})
            })
            .catch((error)=>{console.log(error)})
    }

    incrementPresentationLoadCycles = () => {
        this.setState((prevState) => ({presentationLoadCycles:prevState.presentationLoadCycles+1}) )
    }

    render() {
        const presentation = <Presentation incrementPresentationLoadCycles={this.incrementPresentationLoadCycles} locationToPresent={this.state.locationToPresent} imgURLs={this.state.imgURLs} presentationLoadCycles={this.state.presentationLoadCycles} isLoading={this.state.isLoading}/>
        return (
          <div className="App">
              <Header />
              <ControlPanel changeLocation={this.changeLocation}/>
              {this.state.locationToPresent ? presentation : ""}
              <Footer />
          </div>
        );
  }
}

export default App;
