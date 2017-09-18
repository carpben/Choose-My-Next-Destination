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
            imagesToLoad:9,
            isLoading:false,
            history: [],
        }
    }

    addLocationToHistory = (newLocation) => {
        // updates the this.state.history
        const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
        const dateObj = new Date()
        const dayInt = dateObj.getDay()
        const day = days[dayInt]
        const hour = dateObj.getHours()
        const min = dateObj.getMinutes()
        const sec = dateObj.getSeconds() //seconds and milsecs are collected for the unique key when creating lists and similar elements.
        const msec = dateObj.getMilliseconds()
        const views = 9
        const newHistory = [...this.state.history, { location:newLocation, day, hour, min, sec, msec, views }]
        this.setState({ history: newHistory })
        console.log(newHistory)
    }

    changeLocation= (newLocation) => {
        // Responsible to update the state when a new location is given. Makes AJAX request to Flickr.com.
        this.addLocationToHistory(newLocation)
        this.setState({locationToPresent:newLocation, imagesToLoad:9, isLoading:true})

        const flickrKey= "f7c143a6865aefe5a377912d751edb5a"
        const AJAXURL=`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${flickrKey}&per_page=70&tags=${newLocation}&extras=url_l,url_o,url_m&format=json&nojsoncallback=1`
        fetch(AJAXURL)
            .then(res => res.json())
            .then(data => {
                let imgURLs = []
                data.photos.photo.forEach( (photo) => {
                    if (photo.width_l==="1024"){
                        imgURLs.push(photo.url_l)
                    }
                })
                this.setState({imgURLs, isLoading:false})
            })
            .catch((error)=>{console.log(error)})
    }

    updateViewsInHistory = (int) => {
        // Updates the number of views of a search in state.history
        let newHistory = [...this.state.history]
        newHistory[newHistory.length-1].views=int
        this.setState( {history : newHistory} )
    }

    showMoreImages = () => {
        // Responsible to update the state to show more images
        let newValOfImagesToLoad = this.state.imagesToLoad + 9
        newValOfImagesToLoad = (newValOfImagesToLoad<this.state.imgURLs.length)? newValOfImagesToLoad : this.state.imgURLs.length
        this.updateViewsInHistory (newValOfImagesToLoad)
        this.setState({imagesToLoad:newValOfImagesToLoad} )
    }

    clearHistory = () => {
        this.setState({history:[]})
    }

    render() {
        const presentation = <Presentation showMoreImages={this.showMoreImages} locationToPresent={this.state.locationToPresent} imgURLs={this.state.imgURLs} imagesToLoad={this.state.imagesToLoad} isLoading={this.state.isLoading}/>
        return (
          <div className="App">
              <Header />
              <ControlPanel changeLocation={this.changeLocation} clearHistory={this.clearHistory} history={this.state.history}/>
              {this.state.locationToPresent ? presentation : ""}
              <Footer />
          </div>
        );
  }
}

export default App;
