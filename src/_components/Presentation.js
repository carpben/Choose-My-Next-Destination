import React, { Component } from 'react'
import '../App.css'

export default class Presentation extends Component {
    loadMoreHandler = () => {
        this.props.incrementPresentationLoadCycles()
    }

    render (){
        const loadingHeader = <h2>Loading {this.props.locationToPresent} ... </h2>
        const galleryHeader = <h2><small>Check Out</small> {this.props.locationToPresent}</h2>

        const imgURLsToPresent = this.props.imgURLs.filter( (url, key) => {
            return key<this.props.imagesToLoad
        })
        let gallery = (
            <div className="gallery">
                {imgURLsToPresent.map( (url) => <img src={url} data-featherlight={url} alt={this.props.destination} key={url} />)}
            </div>
        )

        const loadLink = <h4><a href="#load more" onClick={this.props.showMoreImages}>Show More</a></h4>

        return (
            <section className="Presentation">
                {this.props.isLoading? loadingHeader : galleryHeader}
                {gallery}
                {this.props.imagesToLoad<this.props.imgURLs.length ? loadLink : ""}
            </section>
        )
    }
}
