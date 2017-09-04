import React, { Component } from 'react'
import '../App.css'

export default class Presentation extends Component {
    loadMoreHandler = () => {
        this.props.incrementPresentationLoadCycles()
    }

    render (){
        const loadingHeader = <h2>Loading {this.props.locationToPresent} ... </h2>
        const galleryHeader = <h2><small>Check Out</small> {this.props.locationToPresent}</h2>

        let limit = this.props.presentationLoadCycles * 9
        limit = (this.props.imgURLs.length<limit)? this.props.imgURLs.length : limit

        const imgURLsToPresent = this.props.imgURLs.filter( (url, key) => {
            return key<limit
        })
        let gallery = (
            <div className="gallery">
                {imgURLsToPresent.map( (url) => <img src={url} data-featherlight={url} alt={this.props.destination} />)}
            </div>
        )

        const loadLink = <h4><a href="#load more" onClick={this.loadMoreHandler}>Show More</a></h4>

        return (
            <section className="Presentation">
                {this.props.isLoading? loadingHeader : galleryHeader}
                {gallery}
                {limit<this.props.imgURLs.length ? loadLink : ""}
            </section>
        )
    }
}
